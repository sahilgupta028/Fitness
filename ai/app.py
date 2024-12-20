import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from fastapi import FastAPI,  Request
from pydantic import BaseModel
import uvicorn

# Load CSV Data
def load_csv_data(file_path):
    data = pd.read_csv(file_path)
    
    # Extract exercise names and features
    exercise_names = data['name'].values.tolist()
    exercise_features = data.drop(columns=['name']).values  # Remove 'name' column for features
    return exercise_names, exercise_features

# Generate Mock Data if CSV is not available (Optional)
def generate_mock_data(num_samples=1000):
    np.random.seed(42)
    
    user_features = np.random.rand(num_samples, 3)  # [Height, Weight, Goal Level]
    exercise_features = np.random.rand(num_samples, 5)  # [Difficulty, Target Muscle, etc.]
    suitability_scores = np.random.rand(num_samples, 1)  # Random suitability scores

    return user_features, exercise_features, suitability_scores

# FastAPI setup
app = FastAPI()

# Pydantic Model for User Input
class UserInput(BaseModel):
    height: float  # User's height in meters
    weight: float  # User's weight in kg
    goal_level: float  # Goal level (normalized value)

# Load Data (or use mock data)
file_path = "exercise.csv"  # Update to your actual file path
exercise_names, exercise_features = load_csv_data(file_path)

# Generate Mock Data (optional)
user_features, exercise_features, suitability_scores = generate_mock_data(num_samples=1000)

# Split into training and testing sets
X_train_users, X_test_users, X_train_exercises, X_test_exercises, y_train, y_test = train_test_split(
    user_features, exercise_features, suitability_scores, test_size=0.2, random_state=42
)

# Model Definition (PyTorch)
class ExerciseRecommendationModel(nn.Module):
    def __init__(self, user_feature_dim, exercise_feature_dim, hidden_dim=128):
        super(ExerciseRecommendationModel, self).__init__()
        # Embedding layers
        self.user_embedding = nn.Linear(user_feature_dim, hidden_dim)
        self.exercise_embedding = nn.Linear(exercise_feature_dim, hidden_dim)

        # Scoring mechanism
        self.scoring = nn.Sequential(
            nn.ReLU(),
            nn.Linear(hidden_dim, 1)
        )

    def forward(self, user_features, exercise_features):
        user_vec = self.user_embedding(user_features)
        exercise_vec = self.exercise_embedding(exercise_features)

        # Combine embeddings (element-wise multiplication)
        combined = user_vec * exercise_vec
        score = self.scoring(combined)

        return score

# Initialize Model
user_feature_dim = X_train_users.shape[1]
exercise_feature_dim = X_train_exercises.shape[1]
hidden_dim = 128

model = ExerciseRecommendationModel(user_feature_dim, exercise_feature_dim, hidden_dim)

# Loss Function and Optimizer
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Convert Data to Tensors
X_train_users = torch.tensor(X_train_users, dtype=torch.float32)
X_test_users = torch.tensor(X_test_users, dtype=torch.float32)
X_train_exercises = torch.tensor(X_train_exercises, dtype=torch.float32)
X_test_exercises = torch.tensor(X_test_exercises, dtype=torch.float32)
y_train = torch.tensor(y_train, dtype=torch.float32)
y_test = torch.tensor(y_test, dtype=torch.float32)

# Training Loop
num_epochs = 100
for epoch in range(num_epochs):
    model.train()

    # Forward pass
    predictions = model(X_train_users, X_train_exercises)
    loss = criterion(predictions, y_train)

    # Backward pass and optimization
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if (epoch + 1) % 10 == 0:
        print(f"Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}")

# Evaluate the Model
model.eval()
with torch.no_grad():
    test_predictions = model(X_test_users, X_test_exercises)
    test_loss = criterion(test_predictions, y_test)
    print(f"Test Loss: {test_loss.item():.4f}")

# Recommendation Function
def recommend_exercises(user_input, num_exercises=10):
    user_input_tensor = torch.tensor(user_input, dtype=torch.float32).unsqueeze(0)
    all_exercises = torch.tensor(exercise_features, dtype=torch.float32)

    model.eval()
    with torch.no_grad():
        # Get the scores for all exercises
        scores = model(user_input_tensor.repeat(all_exercises.size(0), 1), all_exercises)
        
        # Convert scores to numpy for easier processing and filtering
        scores = scores.squeeze().numpy()

        # Get indices where the scores are not NaN
        valid_indices = ~np.isnan(scores)

        # Filter out NaN scores and corresponding exercise names
        valid_scores = scores[valid_indices]
        valid_exercises = [exercise_names[i] for i in range(len(scores)) if valid_indices[i].item()]

        # Sort the scores in descending order and get the indices of the top recommendations
        sorted_indices = np.argsort(valid_scores)[::-1]

    # Get the top N valid recommendations (default: 10)
    recommendations = []
    for i in sorted_indices[:num_exercises]:
        # If the exercise name is not NaN, add it to recommendations
        exercise = valid_exercises[i.item()]
        if exercise is not np.nan and exercise is not None:
            recommendations.append(exercise)

    return recommendations

# FastAPI Route for Recommendations
@app.post("/recommend")
async def get_recommendations(request: Request):
    data = await request.json()
    print(data)

    user_data = [data.get('height'), data.get('weight'), data.get('goal_level')]
    
    # Get recommendations based on user input
    recommendations = recommend_exercises(user_data, num_exercises=100)
    
    return {"recommended_exercises": recommendations}

# Run the FastAPI app
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
