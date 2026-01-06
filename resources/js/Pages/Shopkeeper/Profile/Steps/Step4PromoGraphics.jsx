import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

export default function Step4PromoGraphics({ data, setData, business }) {
    const businessLogoRef = useRef(null);
    const shopSignageRef = useRef(null);
    const shopPicturesRef = useRef(null);
    const promoPicturesRef = useRef(null);

    const [businessLogoPreview, setBusinessLogoPreview] = useState(null);
    const [shopSignagePreview, setShopSignagePreview] = useState(null);
    const [shopPicturesPreview, setShopPicturesPreview] = useState(null);
    const [promoPicturesPreviews, setPromoPicturesPreviews] = useState([]);

    // Load existing images from business data
    useEffect(() => {
        if (business) {
            if (business.business_logo) {
                setBusinessLogoPreview(`/storage/${business.business_logo}`);
            }
            if (business.shop_signage_picture) {
                setShopSignagePreview(`/storage/${business.shop_signage_picture}`);
            }
            if (business.shop_pictures) {
                setShopPicturesPreview(`/storage/${business.shop_pictures}`);
            }
            if (business.promo_pictures && Array.isArray(business.promo_pictures)) {
                setPromoPicturesPreviews(business.promo_pictures.map(pic => `/storage/${pic}`));
            }
        }
    }, [business]);

    const handleSingleImageUpload = (e, field, setPreview) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            e.target.value = '';
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size should be less than 5MB');
            e.target.value = '';
            return;
        }

        setData(field, file);
        
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.onerror = () => {
            alert('Failed to read file');
            e.target.value = '';
        };
        reader.readAsDataURL(file);
    };

    const handleMultipleImageUpload = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // Validate all files
        const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
        if (invalidFiles.length > 0) {
            alert('Please select only image files');
            e.target.value = '';
            return;
        }

        const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
        if (oversizedFiles.length > 0) {
            alert('All images should be less than 5MB');
            e.target.value = '';
            return;
        }

        const newFiles = [...(data.promo_pictures || []), ...files];
        setData('promo_pictures', newFiles);

        // Create previews
        let loadedCount = 0;
        const newPreviews = [];

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result);
                loadedCount++;
                
                if (loadedCount === files.length) {
                    setPromoPicturesPreviews(prev => [...prev, ...newPreviews]);
                }
            };
            reader.onerror = () => {
                console.error('Failed to read file');
                loadedCount++;
            };
            reader.readAsDataURL(file);
        });
    };

    const removeSingleImage = (field, setPreview, inputRef) => {
        setData(field, null);
        setPreview(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const removePromoPicture = (index) => {
        const newPreviews = promoPicturesPreviews.filter((_, i) => i !== index);
        const newFiles = (data.promo_pictures || []).filter((_, i) => i !== index);
        setPromoPicturesPreviews(newPreviews);
        setData('promo_pictures', newFiles);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Business Logo */}
            <div>
                <div className="flex items-center justify-between gap-4 p-1 sm:p-2 rounded-xl border-2 border-[#B9BBBD] bg-white">
                    <label className="px-2 text-sm sm:text-base text-gray-600 flex-1">
                        Business Logo
                    </label>
                    <button
                        type="button"
                        onClick={() => businessLogoRef.current?.click()}
                        className="px-4 py-2 sm:px-6 sm:py-2.5 bg-[#6F9C3D] text-white text-sm sm:text-base font-medium rounded-lg hover:bg-[#5d8a32] transition-colors whitespace-nowrap"
                    >
                        Choose Image
                    </button>
                    <input
                        type="file"
                        ref={businessLogoRef}
                        onChange={(e) => handleSingleImageUpload(e, 'business_logo', setBusinessLogoPreview)}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
                {businessLogoPreview && (
                    <div className="my-4 relative inline-block">
                        <img 
                            src={businessLogoPreview} 
                            alt="Business Logo Preview" 
                            className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl border-2 border-gray-200"
                        />
                        <button
                            type="button"
                            onClick={() => removeSingleImage('business_logo', setBusinessLogoPreview, businessLogoRef)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md"
                            aria-label="Remove business logo"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Shop Signage Picture */}
            <div>
                <div className="flex items-center justify-between gap-4 p-1 sm:p-2 rounded-xl border-2 border-[#B9BBBD] bg-white">
                    <label className="px-2 text-sm sm:text-base text-gray-600 flex-1">
                        Shop Signage Picture
                    </label>
                    <button
                        type="button"
                        onClick={() => shopSignageRef.current?.click()}
                        className="px-4 py-2 sm:px-6 sm:py-2.5 bg-[#6F9C3D] text-white text-sm sm:text-base font-medium rounded-lg hover:bg-[#5d8a32] transition-colors whitespace-nowrap"
                    >
                        Choose Image
                    </button>
                    <input
                        type="file"
                        ref={shopSignageRef}
                        onChange={(e) => handleSingleImageUpload(e, 'shop_signage_picture', setShopSignagePreview)}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
                {shopSignagePreview && (
                    <div className="my-4 relative inline-block w-full max-w-md">
                        <img 
                            src={shopSignagePreview} 
                            alt="Shop Signage Preview" 
                            className="w-full h-32 sm:h-40 object-cover rounded-xl border-2 border-gray-200"
                        />
                        <button
                            type="button"
                            onClick={() => removeSingleImage('shop_signage_picture', setShopSignagePreview, shopSignageRef)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md"
                            aria-label="Remove shop signage picture"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Shop Pictures */}
            <div className="md:col-span-2">
                <div className="flex items-center justify-between gap-4 p-1 sm:p-2 rounded-xl border-2 border-[#B9BBBD] bg-white">
                    <label className="px-2 text-sm sm:text-base text-gray-600 flex-1">
                        Shop Pictures
                    </label>
                    <button
                        type="button"
                        onClick={() => shopPicturesRef.current?.click()}
                        className="px-4 py-2 sm:px-6 sm:py-2.5 bg-[#6F9C3D] text-white text-sm sm:text-base font-medium rounded-lg hover:bg-[#5d8a32] transition-colors whitespace-nowrap"
                    >
                        Choose Image
                    </button>
                    <input
                        type="file"
                        ref={shopPicturesRef}
                        onChange={(e) => handleSingleImageUpload(e, 'shop_pictures', setShopPicturesPreview)}
                        accept="image/*"
                        className="hidden"
                    />
                </div>
                {shopPicturesPreview && (
                    <div className="my-4 relative inline-block w-full">
                        <img 
                            src={shopPicturesPreview} 
                            alt="Shop Pictures Preview" 
                            className="w-full h-48 sm:h-64 object-cover rounded-xl border-2 border-gray-200"
                        />
                        <button
                            type="button"
                            onClick={() => removeSingleImage('shop_pictures', setShopPicturesPreview, shopPicturesRef)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md"
                            aria-label="Remove shop pictures"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>

            {/* Promo Pictures */}
            <div className="md:col-span-2">
                <div className="flex items-center justify-between gap-4 p-1 sm:p-2 rounded-xl border-2 border-[#B9BBBD] bg-white">
                    <label className="px-2 text-sm sm:text-base text-gray-600 flex-1">
                        Promo Pictures
                    </label>
                    <button
                        type="button"
                        onClick={() => promoPicturesRef.current?.click()}
                        className="px-4 py-2 sm:px-6 sm:py-2.5 bg-[#6F9C3D] text-white text-sm sm:text-base font-medium rounded-lg hover:bg-[#5d8a32] transition-colors whitespace-nowrap"
                    >
                        Choose Image
                    </button>
                    <input
                        type="file"
                        ref={promoPicturesRef}
                        onChange={handleMultipleImageUpload}
                        accept="image/*"
                        multiple
                        className="hidden"
                    />
                </div>
                {promoPicturesPreviews.length > 0 && (
                    <div className="my-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                        {promoPicturesPreviews.map((preview, index) => (
                            <div key={index} className="relative">
                                <img 
                                    src={preview} 
                                    alt={`Promo ${index + 1}`} 
                                    className="w-full h-32 sm:h-48 lg:h-64 object-cover rounded-xl border-2 border-gray-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => removePromoPicture(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                                    aria-label={`Remove promo picture ${index + 1}`}
                                >
                                    <X className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
