import { Checkbox } from '@/components/ui/checkbox'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { servicesData } from '@/data/addOrder'
import { ISelectServiceAndComplexitiesProps } from './interface/IAddOrderProps'

export default function SelectServiceAndComplexities({
    handleServiceChange,
    handleComplexityChange,
    selectedServices,
}: ISelectServiceAndComplexitiesProps) {
    return (
        <div className="flex flex-col">
            <h3 className="mb-6 text-lg font-semibold">Select Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-5">
                {servicesData.map((serviceOption) => (
                    <div key={serviceOption.name} className="flex flex-col">
                        <div className={`flex items-center gap-2`}>
                            <Checkbox
                                id={serviceOption.name}
                                checked={Boolean(
                                    selectedServices[serviceOption.name],
                                )}
                                onCheckedChange={() =>
                                    handleServiceChange(serviceOption.name)
                                }
                            />
                            <label
                                htmlFor={serviceOption.name}
                                className={`text-md font-medium text-gray-800`}
                            >
                                {serviceOption.name}
                            </label>
                        </div>
                        {selectedServices[serviceOption.name] && (
                            <div className="mt-2">
                                <Select
                                    onValueChange={(value) =>
                                        handleComplexityChange(
                                            serviceOption.name,
                                            value,
                                        )
                                    }
                                    required
                                >
                                    <SelectTrigger className="w-full border rounded-md">
                                        <SelectValue placeholder="Select Complexity" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>
                                                Complexity
                                            </SelectLabel>
                                            {serviceOption.complexities.map(
                                                (complexityOption) => (
                                                    <SelectItem
                                                        key={
                                                            complexityOption.label
                                                        }
                                                        value={
                                                            complexityOption.label
                                                        }
                                                    >
                                                        {complexityOption.label}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
