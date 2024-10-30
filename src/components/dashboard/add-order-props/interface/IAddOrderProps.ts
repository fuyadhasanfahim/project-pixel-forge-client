export interface ISelectServiceAndComplexitiesProps {
    handleServiceChange: (serviceName: string) => void
    handleComplexityChange: (serviceName: string, complexity: string) => void
    selectedServices: {
        [key: string]: boolean
    }
}

export interface IInstructionsProps {
    instructions: string
    setInstructions: React.Dispatch<React.SetStateAction<string>>
}

export interface IOutputFormatProps {
    setOutputFormat: React.Dispatch<React.SetStateAction<string>>
}

export interface IDeliveryDateProps {
    date: Date | undefined
    setDate: (date: Date | undefined) => void
}

export interface TimePickerProps {
    setTime: (time: { hour: string; minute: string }) => void
}

export interface IUploadFilesProps {
    handleFileUpload: (files: File[]) => void
    files: File[]
    uploadProgress: number
}
