import { useForm } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "@/Layouts/DashboardLayout";
import toast from "react-hot-toast";
import ProgressStepper from "@/Components/ProgressStepper";
import Step1BasicInfo from "./Steps/Step1BasicInfo";
import Step2BusinessRegistration from "./Steps/Step2BusinessRegistration";
import Step3OperatingDetails from "./Steps/Step3OperatingDetails";
import Step4PromoGraphics from "./Steps/Step4PromoGraphics";
import Step5ServicesAndPolicies from "./Steps/Step5ServicesAndPolicies";

export default function Setup({ auth }) {
  const [step, setStep] = useState(1);
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allFormData, setAllFormData] = useState({});

  const steps = [
    "Basic Info",
    "Business Registration",
    "Operating Details",
    "Promo/Info graphics",
    "Services & Policies",
  ];

  // Fetch business data on mount
  useEffect(() => {
    const fetchBusiness = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get("/api/v1/shopkeeper/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.success && response.data?.user?.business) {
          const businessData = response.data.user.business;
          setBusiness(businessData);
          setAllFormData(businessData);
        }
      } catch (error) {
        console.error("Error fetching business:", error);
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchBusiness();
  }, []);

  // Get initial data for current step
  const getStepData = (stepNumber) => {
    switch (stepNumber) {
      case 1:
        return {
          owner_name: allFormData.owner_name || "",
          country_code: allFormData.country_code || "+92",
          phone_number: allFormData.phone_number || "",
          email: allFormData.email || auth?.user?.email || "",
          whatsapp_number: allFormData.whatsapp_number || "",
        };
      case 2:
        return {
          store_name: allFormData.store_name || "",
          branch_name: allFormData.branch_name || "",
          business_category: allFormData.business_category || "",
          business_sub_category: allFormData.business_sub_category || "",
          special_type: allFormData.special_type || "",
          business_license_number: allFormData.business_license_number || "",
          tax_id: allFormData.tax_id || "",
          cr_number: allFormData.cr_number || "",
          bank_name: allFormData.bank_name || "",
          iban: allFormData.iban || "",
          region: allFormData.region || "",
          shop_country: allFormData.shop_country || "",
          shop_city: allFormData.shop_city || "",
          location_coordinates: allFormData.location_coordinates || "",
          shop_address: allFormData.shop_address || "",
          store_size: allFormData.store_size || "",
          municipality_number: allFormData.municipality_number || "",
        };
      case 3:
        return {
          operating_days: allFormData.operating_days || [],
          opening_time: allFormData.opening_time || "",
          closing_time: allFormData.closing_time || "",
          break_start: allFormData.break_start || "",
          break_end: allFormData.break_end || "",
          delivery_fee: allFormData.delivery_fee || "",
          free_delivery_price_range: allFormData.free_delivery_price_range || "",
          average_delivery_time: allFormData.average_delivery_time || "",
          minimum_order_value: allFormData.minimum_order_value || "",
          delivery_radius: allFormData.delivery_radius || "",
        };
      case 4:
        return {
          business_logo: allFormData.business_logo || null,
          shop_signage_picture: allFormData.shop_signage_picture || null,
          shop_pictures: allFormData.shop_pictures || null,
          promo_pictures: allFormData.promo_pictures || [],
        };
      case 5:
        return {
          home_delivery: allFormData.home_delivery || "no",
          online_payment: allFormData.online_payment || "no",
          exchange_policy: allFormData.exchange_policy || "no",
          mobile_pos: allFormData.mobile_pos || "no",
          cash_on_delivery: allFormData.cash_on_delivery || "no",
          return_policy: allFormData.return_policy || "no",
          pickup: allFormData.pickup || "no",
        };
      default:
        return {};
    }
  };

  const { data, setData, processing, errors, setError, clearErrors } = useForm(getStepData(1));

  // Update form data when business is loaded
  useEffect(() => {
    if (business && Object.keys(allFormData).length > 0) {
      setData(getStepData(step));
    }
  }, [allFormData]);

  // Validation function
  const validateStep = (currentStep, stepData) => {
    const errors = {};

    switch (currentStep) {
      case 1:
        if (!stepData.owner_name?.trim())
          errors.owner_name = "Owner name is required";
        if (!stepData.country_code?.trim())
          errors.country_code = "Country code is required";
        if (!stepData.phone_number?.trim())
          errors.phone_number = "Mobile number is required";
        if (!stepData.email?.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepData.email)) {
          errors.email = "Please enter a valid email address";
        }
        break;
      case 2:
        if (!stepData.store_name?.trim())
          errors.store_name = "Store name is required";
        if (!stepData.business_category?.trim())
          errors.business_category = "Business category is required";
        break;
      case 3:
        if (!stepData.operating_days || stepData.operating_days.length === 0) {
          errors.operating_days = "Please select at least one operating day";
        }
        if (!stepData.opening_time)
          errors.opening_time = "Opening time is required";
        if (!stepData.closing_time)
          errors.closing_time = "Closing time is required";
        break;
      case 4:
      case 5:
        break;
    }

    return errors;
  };

  const handleNext = async () => {
    const validationErrors = validateStep(step, data);

    if (Object.keys(validationErrors).length > 0) {
      Object.keys(validationErrors).forEach((key) => {
        setError(key, validationErrors[key]);
      });
      toast.error("Please fill in all required fields");
      return;
    }

    clearErrors();

    try {
      const formData = new FormData();
      formData.append("step", step);

      Object.keys(data).forEach((key) => {
        if (data[key] !== null && data[key] !== undefined && data[key] !== "") {
          if (Array.isArray(data[key])) {
            if (key === "promo_pictures") {
              data[key].forEach((file, index) => {
                formData.append(`${key}[${index}]`, file);
              });
            } else if (key === "operating_days") {
              data[key].forEach((day, index) => {
                formData.append(`${key}[${index}]`, day);
              });
            } else {
              data[key].forEach((item, index) => {
                formData.append(`${key}[${index}]`, item);
              });
            }
          } else if (data[key] instanceof File) {
            formData.append(key, data[key]);
          } else {
            formData.append(key, data[key]);
          }
        }
      });

      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/api/v1/shopkeeper/profile/save-step", formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAllFormData((prev) => ({ ...prev, ...data }));

        const nextStep = step + 1;
        setStep(nextStep);
        setData(getStepData(nextStep));
        toast.success("Progress saved successfully");
      }
    } catch (error) {
      console.error("Error saving step:", error);
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        Object.keys(serverErrors).forEach((key) => {
          setError(key, serverErrors[key][0]);
        });
      }
      toast.error(
        error.response?.data?.message ||
          "Failed to save progress. Please try again."
      );
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setAllFormData((prev) => ({ ...prev, ...data }));

      const prevStep = step - 1;
      setStep(prevStep);
      setData(getStepData(prevStep));
      clearErrors();
    }
  };

  const handleComplete = async () => {
    const validationErrors = validateStep(step, data);

    if (Object.keys(validationErrors).length > 0) {
      Object.keys(validationErrors).forEach((key) => {
        setError(key, validationErrors[key]);
      });
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const finalData = { ...allFormData, ...data };
      const formData = new FormData();

      Object.keys(finalData).forEach((key) => {
        if (
          finalData[key] !== null &&
          finalData[key] !== undefined &&
          finalData[key] !== ""
        ) {
          if (Array.isArray(finalData[key])) {
            if (key === "promo_pictures") {
              finalData[key].forEach((file, index) => {
                formData.append(`${key}[${index}]`, file);
              });
            } else if (key === "operating_days") {
              finalData[key].forEach((day, index) => {
                formData.append(`${key}[${index}]`, day);
              });
            } else {
              finalData[key].forEach((item, index) => {
                formData.append(`${key}[${index}]`, item);
              });
            }
          } else if (finalData[key] instanceof File) {
            formData.append(key, finalData[key]);
          } else {
            formData.append(key, finalData[key]);
          }
        }
      });

      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "/api/v1/shopkeeper/profile/complete",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile completed successfully!");
        router.visit(response.data.redirect);
      }
    } catch (error) {
      console.error("Error completing profile:", error);
      if (error.response?.data?.errors) {
        const serverErrors = error.response.data.errors;
        Object.keys(serverErrors).forEach((key) => {
          setError(key, serverErrors[key][0]);
        });
      }
      toast.error(
        error.response?.data?.message ||
          "Failed to complete profile. Please try again."
      );
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Set up your Owner's Profile details";
      case 2:
        return "Business Details";
      case 3:
        return "Set up your Operating Details";
      case 4:
        return "Promo/Info Graphics";
      case 5:
        return "Set up your Services & Policies";
      default:
        return "Company Profile Setup";
    }
  };

  const renderStepContent = () => {
    const commonProps = { data, setData, errors };

    switch (step) {
      case 1:
        return <Step1BasicInfo {...commonProps} />;
      case 2:
        return <Step2BusinessRegistration {...commonProps} />;
      case 3:
        return <Step3OperatingDetails {...commonProps} />;
      case 4:
        return <Step4PromoGraphics {...commonProps} business={business} />;
      case 5:
        return <Step5ServicesAndPolicies {...commonProps} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <DashboardLayout auth={auth} hideSidebar={true}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6">Loading...</h3>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-[#6F9C3D] rounded-full animate-bounce" style={{ animationDelay: "0ms", animationDuration: "0.6s" }}></div>
              <div className="w-3 h-3 bg-[#6F9C3D] rounded-full animate-bounce" style={{ animationDelay: "200ms", animationDuration: "0.6s" }}></div>
              <div className="w-3 h-3 bg-[#6F9C3D] rounded-full animate-bounce" style={{ animationDelay: "400ms", animationDuration: "0.6s" }}></div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout auth={auth} hideSidebar={true}>
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8 sm:mb-10">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              {getStepTitle()}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600">
              Add your details to setup your store on MyGrocer.
            </p>
          </div>
          <button
            onClick={() => router.visit("/dashboard")}
            className="bg-[#6F9C3D] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-sm sm:text-base lg:text-lg font-medium transition-colors hover:bg-[#5d8a32] whitespace-nowrap"
          >
            Skip & Do later
          </button>
        </div>

        {/* Progress Stepper */}
        <div className="mb-8">
          <ProgressStepper steps={steps} currentStep={step} />
        </div>

        {/* Form Container */}
        <div className="w-full">
          <form onSubmit={(e) => e.preventDefault()}>
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-8 sm:pt-12 lg:pt-16">
              <button
                type="button"
                className={`w-full sm:w-auto px-6 py-2 sm:px-8 sm:py-3 rounded-xl font-medium text-sm sm:text-base lg:text-lg transition-all ${
                  step === 1
                    ? "bg-gray-300 text-white opacity-50 cursor-not-allowed"
                    : "bg-[#ABABAB] text-white hover:bg-gray-400"
                }`}
                onClick={handlePrevious}
                disabled={step === 1}
              >
                Previous
              </button>
              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2 sm:px-8 sm:py-3 rounded-xl font-medium text-sm sm:text-base lg:text-lg transition-all bg-[#6F9C3D] text-white hover:bg-[#5d8a32] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={step === 5 ? handleComplete : handleNext}
                disabled={processing}
              >
                {step === 5
                  ? processing
                    ? "Completing..."
                    : "Complete Setup"
                  : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
