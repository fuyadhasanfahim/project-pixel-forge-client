import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ReferenceProps {
    setReference: (value: string) => void
}

export default function Reference({ setReference }: ReferenceProps) {
    return (
        <div className="w-full">
            <Label htmlFor="reference" className="block mb-2 text-gray-700">
                Reference
            </Label>
            <Input
                id="reference"
                type="text"
                name="reference"
                placeholder="Reference name"
                onChange={(e) => setReference(e.target.value)}
                required
                className="py-2 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:border-primary"
            />
        </div>
    )
}
