import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { IInstructionsProps } from './interface/IAddOrderProps'

export default function Instructions({
    instructions,
    setInstructions,
}: IInstructionsProps) {
    return (
        <div className="grid w-full max-w-full space-y-2">
            <Label htmlFor="message" className="text-lg">
                Instructions
            </Label>
            <Textarea
                id="message"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Add any details about your order..."
                className="resize-none h-32"
                required
            />
        </div>
    )
}
