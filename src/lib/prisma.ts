import { PrismaClient } from "@prisma/client"
import { mockData } from "./mockData"

const defaultMockMethods: Record<string, any> = {
    count: 0,
    findMany: [],
    findUnique: null,
    findFirst: null,
    create: { id: "mock-id-123" },
    update: { id: "mock-id-123" },
    delete: { id: "mock-id-123" },
    upsert: { id: "mock-id-123" },
    groupBy: [],
}

const mockPrismaHandler = {
    get(target: any, modelProp: string) {
        if (modelProp === "$queryRaw") return async () => []
        if (modelProp === "$transaction") return async (cb: any) => Array.isArray(cb) ? Promise.all(cb) : cb(target)
        if (modelProp === "$connect") return async () => {}
        if (modelProp === "$disconnect") return async () => {}

        return new Proxy({}, {
            get(modelTarget: any, methodProp: string) {
                return async (...args: any[]) => {
                    // Specific mock overrides based on mockData
                    if (modelProp === "store" && methodProp === "count") return mockData.storeCount
                    if (modelProp === "supplierProfile" && methodProp === "count") return mockData.supplierCount
                    if (modelProp === "cachedOrder" && methodProp === "count") return mockData.orderCount
                    if (modelProp === "connection" && methodProp === "findMany") return mockData.connections
                    if (modelProp === "productSync" && methodProp === "findMany") return mockData.productSyncs
                    if (modelProp === "syncMetadata" && methodProp === "findMany") return mockData.syncMetadata
                    if (modelProp === "emailLog" && methodProp === "findMany") return mockData.emailLogs
                    
                    if (methodProp === "groupBy") {
                        const byField = args[0]?.by?.[0]
                        if (byField && modelProp === "connection") {
                            const groups: any = {}
                            mockData.connections.forEach((c: any) => {
                                const key = c[byField]
                                if (!groups[key]) groups[key] = { [byField]: key, _count: { _all: 0 } }
                                groups[key]._count._all++
                            })
                            return Object.values(groups)
                        }
                        if (byField && modelProp === "productSync") {
                            const groups: any = {}
                            mockData.productSyncs.forEach((c: any) => {
                                const key = c[byField]
                                if (!groups[key]) groups[key] = { [byField]: key, _count: { _all: 0 } }
                                groups[key]._count._all++
                            })
                            return Object.values(groups)
                        }
                    }

                    // Fallback to default mock responses
                    return defaultMockMethods[methodProp] ?? null
                }
            }
        })
    }
}

export const prisma = new Proxy({}, mockPrismaHandler) as unknown as PrismaClient
