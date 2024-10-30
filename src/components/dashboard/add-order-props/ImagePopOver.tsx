import { Button } from '@/components/ui/button'
import { useState, useRef, useEffect } from 'react'

interface ImagePopOverProps {
    imageUrls: string[]
}

export default function ImagePopOver({ imageUrls }: ImagePopOverProps) {
    const [isOpen, setIsOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative inline-block" ref={popoverRef}>
            <Button
                type="button"
                variant={'outline'}
                onClick={() => setIsOpen(!isOpen)}
            >
                View Images
            </Button>

            {isOpen && (
                <div className="absolute z-10 mt-2 w-full max-w-xl bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                    <h3 className="font-semibold">Uploaded Images</h3>
                    <div className="mt-2 max-h-60 overflow-x-auto whitespace-nowrap">
                        <div className="flex gap-2">
                            {imageUrls.map((imageUrl, index) => (
                                <div
                                    key={index}
                                    className="relative group w-40 flex-shrink-0"
                                >
                                    <img
                                        src={imageUrl}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-40 rounded-lg object-cover"
                                    />
                                    <Button
                                        type="button"
                                        variant={'outline'}
                                        className="absolute top-2 right-2 group-hover:opacity-100 transition-opacity"
                                    >
                                        X
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
