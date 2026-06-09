import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Amount({
    amount,
    setAmount,
}: {
    amount: string
    setAmount: (amount: string) => void
}) {
    return (
        <div className="w-full">
            <Label htmlFor="amount" className="block mb-2 text-gray-700">
                Amount
            </Label>
            <Input
                id="amount"
                type="text"
                name="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => {
                    setAmount(e.target.value)
                }}
                required
                className="py-2 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:border-primary"
            />
        </div>
    )
}
