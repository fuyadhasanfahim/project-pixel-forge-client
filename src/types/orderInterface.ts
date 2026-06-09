interface IOrders {
    length: number
    createdAt: string
    email: string
    orderId: string
    customerId: string
    name: string
    invoiceNumber: string
    totalPrice: number
    ceratedAt: Date
    _id: string
    userId: string
    username: string
    services: string[]
    complexities: Record<string, string>
    instructions: string
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
    orderName: string
    pricePerImage: string
}

export default IOrders
