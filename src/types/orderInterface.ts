interface IOrders {
    _id: string
    userId: string
    username: string
    services: string[]
    complexities: Record<string, string>
    additionalInstructions: string
    outputFormat: string
    deliveryDate: Date
    status:
        | 'pending'
        | 'inprogress'
        | 'delivered'
        | 'completed'
        | 'revision'
        | 'canceled'
        | 'request for additional information'
    paymentStatus: 'pending' | 'paid'
    folderUrl: string
    images: string
}

export default IOrders
