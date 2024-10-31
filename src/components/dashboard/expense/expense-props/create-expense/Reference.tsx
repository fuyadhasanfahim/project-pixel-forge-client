import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Reference() {
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
                required
                className="py-2 px-4 border border-gray-300 rounded-lg focus:ring focus:ring-primary focus:border-primary"
            />
        </div>
    )
}
