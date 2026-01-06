import React from 'react';

export default function ProgressStepper({ steps, currentStep }) {
    return (
        <div className="mb-6 sm:mb-8 lg:mb-12">
            {/* Desktop Stepper */}
            <div className="hidden md:flex justify-between items-start relative px-4">
                {steps.map((stepName, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber <= currentStep;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;
                    
                    return (
                        <div key={index} className="flex flex-col items-center relative" style={{ flex: '1 1 0%' }}>
                            {/* Connecting Line */}
                            {index < steps.length - 1 && (
                                <div className="absolute top-5 md:top-6 left-1/2 w-full h-0.5 z-0">
                                    <div 
                                        className={`h-full transition-colors duration-300 ${
                                            isCompleted ? 'bg-[#6F9C3D]' : 'bg-gray-300'
                                        }`}
                                        style={{ 
                                            marginLeft: '1.5rem',
                                            width: 'calc(100% - 1.5rem)'
                                        }}
                                    />
                                </div>
                            )}
                            
                            {/* Step Circle */}
                            <div 
                                className={`
                                    w-10 h-10 md:w-12 md:h-12 
                                    rounded-full 
                                    flex items-center justify-center 
                                    font-semibold text-base md:text-lg
                                    mb-2 md:mb-3
                                    transition-all duration-300
                                    relative z-10
                                    ${isActive
                                        ? 'bg-[#6F9C3D] text-white border-2 border-[#6F9C3D] shadow-md'
                                        : 'bg-[#EDEDED] text-gray-500 border-2 border-gray-300'
                                    }
                                    ${isCurrent ? 'scale-110' : 'scale-100'}
                                `}
                            >
                                {isCompleted ? (
                                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    stepNumber
                                )}
                            </div>
                            
                            {/* Step Label */}
                            <span 
                                className={`
                                    text-xs md:text-sm lg:text-base
                                    text-center 
                                    font-medium 
                                    transition-colors duration-300
                                    max-w-[100px] md:max-w-[120px] lg:max-w-none
                                    ${isActive ? 'text-[#6F9C3D] font-semibold' : 'text-[#9B9DA2]'}
                                `}
                            >
                                {stepName}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Mobile/Tablet Stepper */}
            <div className="md:hidden">
                <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs sm:text-sm font-medium text-gray-600">
                        Step {currentStep} of {steps.length}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#6F9C3D] text-right">
                        {steps[currentStep - 1]}
                    </span>
                </div>
                
                {/* Progress Bar */}
                <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                        className="bg-[#6F9C3D] h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${(currentStep / steps.length) * 100}%` }}
                    />
                </div>
                
                {/* Step Indicators */}
                <div className="flex justify-between mt-2 px-1">
                    {steps.map((_, index) => (
                        <div 
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                                index + 1 <= currentStep ? 'bg-[#6F9C3D]' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
