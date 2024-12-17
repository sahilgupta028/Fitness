import mongoose, { Schema } from "mongoose";


// Define the Product schema
const StoreSchema: Schema = new Schema(
  {
    asin: { 
      type: String, 
      required: true, 
      unique: true 
    },
    product_title: { 
      type: String, 
      required: true 
    },
    product_price: { 
      type: String, 
      required: true 
    },
    product_original_price: { 
      type: String 
    },
    currency: { 
      type: String, 
      required: true, 
      default: "INR" 
    },
    product_star_rating: { 
      type: Number, 
      min: 0, 
      max: 5 
    },
    product_num_ratings: { 
      type: Number, 
      default: 0 
    },
    product_url: { 
      type: String, 
      required: true 
    },
    product_photo: { 
      type: String, 
      required: true 
    },
    product_num_offers: { 
      type: Number, 
      default: 0 
    },
    product_minimum_offer_price: { 
      type: String 
    },
    is_best_seller: { 
      type: Boolean, 
      default: false 
    },
    is_amazon_choice: { 
      type: Boolean, 
      default: false 
    },
    is_prime: { 
      type: Boolean, 
      default: false 
    },
    climate_pledge_friendly: { 
      type: Boolean, 
      default: false 
    },
    sales_volume: { 
      type: String 
    },
    delivery: { 
      type: String 
    },
    has_variations: { 
      type: Boolean, 
      default: false 
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Export the Product model
const Store = mongoose.models.Store || mongoose.model("Store", StoreSchema);
export default Store;
