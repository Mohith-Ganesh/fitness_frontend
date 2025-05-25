// Mock data for gym equipment and supplements
export const mockProducts = [
  // Protein Supplements
  {
    product_id: 1,
    name: "Gold Standard Whey Protein",
    description: "Premium whey protein isolate with 24g protein per serving. Perfect for muscle recovery and growth.",
    price: 59.99,
    discounted_price: 49.99,
    stock_quantity: 100,
    image_url: "https://images.pexels.com/photos/3766211/pexels-photo-3766211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "5 lbs",
    color: "Chocolate",
    category: "Protein Supplements"
  },
  {
    product_id: 2,
    name: "Casein Night Protein",
    description: "Slow-digesting protein perfect for overnight muscle recovery and growth.",
    price: 54.99,
    discounted_price: 44.99,
    stock_quantity: 90,
    image_url: "https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "4 lbs",
    color: "Chocolate",
    category: "Protein Supplements"
  },
  {
    product_id: 3,
    name: "Vegan Protein Blend",
    description: "Plant-based protein powder made from pea, rice, and hemp proteins. 100% vegan-friendly.",
    price: 49.99,
    discounted_price: 44.99,
    stock_quantity: 70,
    image_url: "https://images.pexels.com/photos/3735640/pexels-photo-3735640.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "4 lbs",
    color: "Vanilla",
    category: "Protein Supplements"
  },
  
  // Pre/Post Workout Supplements
  {
    product_id: 4,
    name: "Pre-Workout Energy Boost",
    description: "High-performance pre-workout supplement with caffeine, beta-alanine, and creatine for maximum energy and focus.",
    price: 39.99,
    discounted_price: 34.99,
    stock_quantity: 75,
    image_url: "https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "300g",
    color: "Blue Raspberry",
    category: "Pre-Workout"
  },
  {
    product_id: 5,
    name: "BCAA Recovery Complex",
    description: "Branched-chain amino acids supplement with electrolytes for enhanced recovery and hydration.",
    price: 34.99,
    discounted_price: 29.99,
    stock_quantity: 120,
    image_url: "https://images.pexels.com/photos/3822719/pexels-photo-3822719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "400g",
    color: "Fruit Punch",
    category: "Recovery"
  },
  {
    product_id: 6,
    name: "Creatine Monohydrate",
    description: "Pure micronized creatine monohydrate powder. Supports muscle strength and power output.",
    price: 29.99,
    discounted_price: null,
    stock_quantity: 150,
    image_url: "https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "500g",
    color: "Unflavored",
    category: "Strength"
  },
  
  // Mass Gainers & Fat Burners
  {
    product_id: 7,
    name: "Mass Gainer Pro",
    description: "High-calorie protein powder with complex carbs for muscle mass gain. 1250 calories per serving.",
    price: 69.99,
    discounted_price: 59.99,
    stock_quantity: 80,
    image_url: "https://images.pexels.com/photos/3768730/pexels-photo-3768730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "12 lbs",
    color: "Vanilla",
    category: "Mass Gainers"
  },
  {
    product_id: 8,
    name: "CLA Fat Burner",
    description: "Conjugated linoleic acid supplements to support fat loss and lean muscle maintenance.",
    price: 24.99,
    discounted_price: null,
    stock_quantity: 200,
    image_url: "https://images.pexels.com/photos/3846115/pexels-photo-3846115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "90 capsules",
    color: null,
    category: "Fat Burners"
  },
  {
    product_id: 9,
    name: "Thermogenic Fat Burner",
    description: "Advanced thermogenic formula with green tea extract, caffeine, and L-carnitine for enhanced fat burning.",
    price: 34.99,
    discounted_price: 29.99,
    stock_quantity: 85,
    image_url: "https://images.pexels.com/photos/3850997/pexels-photo-3850997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "60 capsules",
    color: null,
    category: "Fat Burners"
  },
  
  // Vitamins & Health
  {
    product_id: 10,
    name: "Multivitamin Elite",
    description: "Comprehensive multivitamin formula specifically designed for active individuals and athletes.",
    price: 29.99,
    discounted_price: 24.99,
    stock_quantity: 150,
    image_url: "https://images.pexels.com/photos/3850838/pexels-photo-3850838.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "120 tablets",
    color: null,
    category: "Vitamins"
  },
  {
    product_id: 11,
    name: "Fish Oil Omega-3",
    description: "High-quality fish oil supplement rich in EPA and DHA for heart and joint health.",
    price: 19.99,
    discounted_price: null,
    stock_quantity: 180,
    image_url: "https://images.pexels.com/photos/3850997/pexels-photo-3850997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "100 softgels",
    color: null,
    category: "Health Supplements"
  },
  {
    product_id: 12,
    name: "Zinc & Magnesium ZMA",
    description: "Zinc, magnesium, and vitamin B6 complex for better sleep, recovery, and testosterone support.",
    price: 22.99,
    discounted_price: 19.99,
    stock_quantity: 110,
    image_url: "https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "90 capsules",
    color: null,
    category: "Health Supplements"
  },
  
  // Gym Equipment - Weights
  {
    product_id: 13,
    name: "Adjustable Dumbbell Set",
    description: "Professional adjustable dumbbells with quick-change plates. Weight range: 5-50 lbs per dumbbell.",
    price: 299.99,
    discounted_price: 249.99,
    stock_quantity: 25,
    image_url: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "5-50 lbs",
    color: "Black/Chrome",
    category: "Free Weights"
  },
  {
    product_id: 14,
    name: "Olympic Barbell",
    description: "45lb Olympic standard barbell with diamond knurling and dual markings. Perfect for powerlifting.",
    price: 199.99,
    discounted_price: 179.99,
    stock_quantity: 30,
    image_url: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "7 feet",
    color: "Black",
    category: "Free Weights"
  },
  {
    product_id: 15,
    name: "Olympic Weight Plate Set",
    description: "Complete set of Olympic weight plates. Includes 45lb, 35lb, 25lb, 10lb, 5lb, and 2.5lb pairs.",
    price: 449.99,
    discounted_price: 399.99,
    stock_quantity: 15,
    image_url: "https://images.pexels.com/photos/1552106/pexels-photo-1552106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "300 lbs total",
    color: "Black",
    category: "Free Weights"
  },
  
  // Gym Equipment - Machines
  {
    product_id: 16,
    name: "Power Rack with Pull-up Bar",
    description: "Heavy-duty power rack with adjustable safety bars, pull-up bar, and plate storage. Max weight: 800 lbs.",
    price: 899.99,
    discounted_price: 799.99,
    stock_quantity: 8,
    image_url: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "84\" H x 48\" W x 48\" D",
    color: "Black",
    category: "Strength Equipment"
  },
  {
    product_id: 17,
    name: "Adjustable Weight Bench",
    description: "Heavy-duty adjustable bench with multiple incline positions. Supports up to 600 lbs.",
    price: 349.99,
    discounted_price: 299.99,
    stock_quantity: 20,
    image_url: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "55\" L x 24\" W",
    color: "Black/Red",
    category: "Strength Equipment"
  },
  {
    product_id: 18,
    name: "Cable Machine System",
    description: "Multi-station cable machine with lat pulldown, low row, and adjustable pulley system.",
    price: 1299.99,
    discounted_price: 1099.99,
    stock_quantity: 5,
    image_url: "https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "84\" H x 48\" W x 72\" D",
    color: "Silver/Black",
    category: "Strength Equipment"
  },
  
  // Cardio Equipment
  {
    product_id: 19,
    name: "Commercial Treadmill",
    description: "Professional-grade treadmill with 4.0 HP motor, 22\" x 60\" running surface, and advanced console.",
    price: 2499.99,
    discounted_price: 2199.99,
    stock_quantity: 3,
    image_url: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "81\" L x 37\" W x 62\" H",
    color: "Black/Silver",
    category: "Cardio Equipment"
  },
  {
    product_id: 20,
    name: "Rowing Machine",
    description: "Air resistance rowing machine with performance monitor and comfortable seat.",
    price: 899.99,
    discounted_price: 799.99,
    stock_quantity: 12,
    image_url: "https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "96\" L x 24\" W x 36\" H",
    color: "Black",
    category: "Cardio Equipment"
  },
  
  // Accessories
  {
    product_id: 21,
    name: "Resistance Band Set",
    description: "Complete resistance band set with 5 bands, door anchor, handles, and ankle straps.",
    price: 49.99,
    discounted_price: 39.99,
    stock_quantity: 60,
    image_url: "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "Light to Extra Heavy",
    color: "Multi-color",
    category: "Accessories"
  },
  {
    product_id: 22,
    name: "Gym Gloves Pro",
    description: "Premium leather gym gloves with wrist support and superior grip. Available in multiple sizes.",
    price: 24.99,
    discounted_price: 19.99,
    stock_quantity: 80,
    image_url: "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "Medium",
    color: "Black",
    category: "Accessories"
  },
  {
    product_id: 23,
    name: "Foam Roller",
    description: "High-density foam roller for muscle recovery and myofascial release. 36-inch length.",
    price: 34.99,
    discounted_price: 29.99,
    stock_quantity: 45,
    image_url: "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "36\" x 6\"",
    color: "Blue",
    category: "Recovery"
  },
  {
    product_id: 24,
    name: "Protein Shaker Bottle",
    description: "BPA-free shaker bottle with wire whisk ball and measurement markings. 28oz capacity.",
    price: 12.99,
    discounted_price: 9.99,
    stock_quantity: 200,
    image_url: "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "28 oz",
    color: "Black",
    category: "Accessories"
  },
  {
    product_id: 25,
    name: "Weightlifting Belt",
    description: "Genuine leather weightlifting belt with double prong buckle for maximum support during heavy lifts.",
    price: 79.99,
    discounted_price: 69.99,
    stock_quantity: 35,
    image_url: "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    size: "Large",
    color: "Brown",
    category: "Accessories"
  }
];

export const mockOrders = [
  {
    order_id: 1,
    user_id: 1,
    total_amount: 324.97,
    status: "delivered",
    payment_method: "Credit Card",
    payment_status: "paid",
    shipping_address: "123 Fitness St, Gymtown, GT 12345",
    tracking_number: "TRK123456789",
    expected_delivery_date: "2025-05-25T00:00:00.000Z",
    createdAt: "2025-05-15T10:30:00.000Z",
    OrderItems: [
      {
        item_id: 1,
        order_id: 1,
        product_id: 1,
        quantity: 2,
        price: 49.99,
        Product: mockProducts[0]
      },
      {
        item_id: 2,
        order_id: 1,
        product_id: 13,
        quantity: 1,
        price: 249.99,
        Product: mockProducts[12]
      },
      {
        item_id: 3,
        order_id: 1,
        product_id: 6,
        quantity: 1,
        price: 29.99,
        Product: mockProducts[5]
      }
    ]
  },
  {
    order_id: 2,
    user_id: 1,
    total_amount: 419.97,
    status: "shipped",
    payment_method: "PayPal",
    payment_status: "paid",
    shipping_address: "123 Fitness St, Gymtown, GT 12345",
    tracking_number: "TRK987654321",
    expected_delivery_date: "2025-06-02T00:00:00.000Z",
    createdAt: "2025-05-28T14:45:00.000Z",
    OrderItems: [
      {
        item_id: 4,
        order_id: 2,
        product_id: 17,
        quantity: 1,
        price: 299.99,
        Product: mockProducts[16]
      },
      {
        item_id: 5,
        order_id: 2,
        product_id: 4,
        quantity: 2,
        price: 34.99,
        Product: mockProducts[3]
      },
      {
        item_id: 6,
        order_id: 2,
        product_id: 21,
        quantity: 1,
        price: 39.99,
        Product: mockProducts[20]
      }
    ]
  },
  {
    order_id: 3,
    user_id: 2,
    total_amount: 149.96,
    status: "processing",
    payment_method: "Credit Card",
    payment_status: "paid",
    shipping_address: "456 Muscle Ave, Strengthville, SV 67890",
    tracking_number: "TRK456789123",
    expected_delivery_date: "2025-06-05T00:00:00.000Z",
    createdAt: "2025-05-30T09:15:00.000Z",
    OrderItems: [
      {
        item_id: 7,
        order_id: 3,
        product_id: 7,
        quantity: 1,
        price: 59.99,
        Product: mockProducts[6]
      },
      {
        item_id: 8,
        order_id: 3,
        product_id: 5,
        quantity: 2,
        price: 29.99,
        Product: mockProducts[4]
      },
      {
        item_id: 9,
        order_id: 3,
        product_id: 25,
        quantity: 1,
        price: 69.99,
        Product: mockProducts[24]
      }
    ]
  }
];

export const mockCart = {
  cart_id: 1,
  user_id: 1,
  CartItems: [
    {
      cart_item_id: 1,
      cart_id: 1,
      product_id: 1,
      quantity: 1,
      price: 49.99,
      Product: mockProducts[0]
    },
    {
      cart_item_id: 2,
      cart_id: 1,
      product_id: 16,
      quantity: 1,
      price: 799.99,
      Product: mockProducts[15]
    },
    {
      cart_item_id: 3,
      cart_id: 1,
      product_id: 22,
      quantity: 2,
      price: 19.99,
      Product: mockProducts[21]
    },
    {
      cart_item_id: 4,
      cart_id: 1,
      product_id: 10,
      quantity: 1,
      price: 24.99,
      Product: mockProducts[9]
    }
  ]
};