"use client";

import { useState, useEffect } from "react";
import { Search, Upload, Camera, CrossIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { processImageSearch } from "@/actions/home";
import useFetch from "@/hooks/use-fetch";


const HomeSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchImage, setSearchImage] = useState(null);
    const [isImageSearchActive, setIsImageSearchActive] = useState(false);
    const [imagePreview, setImagePreview] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter()


    const {
        loading: isProcessing,
        fn: processImageFn,
        data: processResult,
        error: processError,
    } = useFetch(processImageSearch);


    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];

        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("File size exceeds 2MB");
                return;
            };
            setIsUploading(true);
            setSearchImage(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setIsUploading(false);
                toast.success("Image uploaded successfully");
            };

            reader.onerror = () => {
                setIsUploading(false);
                toast.error("Failed uploading image");
            };

            reader.readAsDataURL(file);
        }
    }



    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        accept: {
            "image/*": ["jpeg", "png", "jpg", "webp"],
        },
        maxFiles: 1,
        multiple: false,

    })



    const handleImageSearch = async (e) => {
        e.preventDefault();
        if (!searchImage) {
            toast.error("Please upload image");
            return;
        }
        await processImageFn(searchImage);
    };




    useEffect(() => {
        if (processError) {
            toast.error(
                "Failed to analyze image: " + (processError.message || "Unknown error")
            );
        }
    }, [processError]);


    useEffect(() => {
        if (processResult?.success) {
            const params = new URLSearchParams();
            if (processResult.data.make) params.set("make", processResult.data.make);
            if (processResult.data.bodyType)
                params.set("bodyType", processResult.data.bodyType);
            if (processResult.data.color)
                params.set("color", processResult.data.color);
            router.push(`/cars?${params.toString()}`);
        }
    }, [processResult, router]);




    const handelTextSubmit = async (e) => {
        e.preventDefault();
        if (!searchTerm) {
            toast.error("Please enter something, To make search");
            return;
        }

        router.push(`/cars?search=${encodeURIComponent(searchTerm)}`);
    };



    return (
        <div>
            <form onSubmit={handelTextSubmit}>
                <div className="relative flex items-center">
                    <Search className="absolute left-3 w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Enter name, model, or use AI image exlporer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-12 py-6 w-full rounded-full border-gray-300 bg-white/95 backdrop-blur-sm"
                    />
                    <div className="absolute right-[100px]">
                        <Camera
                            size={35}
                            onClick={() => setIsImageSearchActive(!isImageSearchActive)}
                            className="cursor-pointer text-black rounded-xl p-1.5"
                            style={{
                                background: isImageSearchActive ? "black" : "",
                                color: isImageSearchActive ? "white" : "",
                            }}
                        />
                    </div>

                    <Button type="submit" className="absolute right-2 rounded-full">
                        Explore
                    </Button>

                </div>
            </form>

            {isImageSearchActive && (<div className='mt-4'>
                <form onSubmit={handleImageSearch}>
                    <div className='border-2 border-dashed border-gray-300 rounded-3xl p-6  items-center'>
                        {imagePreview ? (
                            <div className='flex flex-col items-center'>
                                <img
                                    src={imagePreview}
                                    alt="Car Preview"
                                    className='h-40 object-contain mb-4'
                                />
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSearchImage(null);
                                        setImagePreview("");
                                        toast.info("Image removed");
                                    }}
                                >
                                    <X className='h-5 w-5 text-black' />
                                </Button>
                            </div>
                        ) : (
                            <div {...getRootProps()} className='cursor-pointer'>
                                <input {...getInputProps()} />
                                <div className='flex flex-col items-center'>
                                    <Upload className='h-12 w-12 text-gray-400 mb-2' />
                                    <p>{
                                        isDragActive && isDragReject ?
                                            "Drop the file here to upload" :
                                            "Drag and drop image here, or click to select files"
                                    }
                                    </p>
                                    {isDragReject && (
                                        <p className="text-red-500">Unsupported file type</p>
                                    )}
                                    <p className='text-gray-400 mb-2'>
                                        Upload: JPEG, PNG, WEBP, JPG (max 2MB) 
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    {imagePreview && (
                        <Button
                            type="submit"
                            className="w-full mt-2 text-shadow-white bg-gradient-to-r from-[#2af598] to-[#009efd] hover:from-black hover:to-gray-800 cursor-pointer rounded-full"
                            disabled={isUploading || isProcessing}
                        >
                            {
                                isUploading ? "Uploading..." : isProcessing? "Analyzing...":"Explore with AI"
                            }
                        </Button>
                    )}
                </form>
            </div>
            )}
        </div>
    );
};

export default HomeSearch;