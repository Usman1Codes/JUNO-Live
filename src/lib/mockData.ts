export const mockData = {
    storeCount: 42,
    supplierCount: 15,
    orderCount: 1250,
    connections: [
        { id: "c1", status: "CONNECTED", createdAt: new Date(), updatedAt: new Date(), store: { businessName: "Fashion Hub LLC", shopifyStoreName: "Fashion Hub" }, supplier: { companyName: "Textile Inc." } },
        { id: "c2", status: "CONNECTED", createdAt: new Date(), updatedAt: new Date(), store: { businessName: "Accessory World LLC", shopifyStoreName: "Accessory World" }, supplier: { companyName: "LeatherCraft" } },
        { id: "c3", status: "PENDING", createdAt: new Date(), updatedAt: new Date(), store: { businessName: "Summer Vibes LLC", shopifyStoreName: "Summer Vibes" }, supplier: { companyName: "Optics Co." } },
        { id: "c4", status: "REJECTED", createdAt: new Date(), updatedAt: new Date(), store: { businessName: "Tech Gadgets LLC", shopifyStoreName: "Tech Gadgets" }, supplier: { companyName: "Electronics Inc." } },
    ],
    productSyncs: [
        { id: "s1", status: "ACCEPTED", shopifyProductTitle: "Premium Cotton T-Shirt", createdAt: new Date(), store: { shopifyStoreName: "Fashion Hub" }, supplier: { companyName: "Textile Inc." } },
        { id: "s2", status: "PENDING", shopifyProductTitle: "Leather Wallet", createdAt: new Date(), store: { shopifyStoreName: "Accessory World" }, supplier: { companyName: "LeatherCraft" } },
        { id: "s3", status: "REJECTED", shopifyProductTitle: "Sunglasses", createdAt: new Date(), store: { shopifyStoreName: "Summer Vibes" }, supplier: { companyName: "Optics Co." } },
    ],
    syncMetadata: [
        { id: "sm1", syncStatus: "failed", resourceType: "product", lastSyncAt: new Date(), errorMessage: "Invalid API Key", store: { shopifyStoreName: "Fashion Hub" } },
    ],
    emailLogs: [
        { id: "e1", status: "SENT", subject: "Welcome to JUNO", sentAt: new Date(), store: { shopifyStoreName: "Fashion Hub" } }
    ]
};
