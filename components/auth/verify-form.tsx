"use client";

import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/buttons/button";

export function VerifyForm() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isActive, setIsActive] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Timer logic
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value.substring(element.value.length - 1);
        setOtp(newOtp);

        // Focus next input
        if (element.value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            if (!otp[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text");
        if (!/^\d+$/.test(data)) return;

        const splitData = data.split("").slice(0, 6);
        const newOtp = [...otp];

        splitData.forEach((digit, i) => {
            newOtp[i] = digit;
        });
        setOtp(newOtp);

        // Focus the box after the pasted data
        const focusIndex = Math.min(splitData.length, 5);
        inputRefs.current[focusIndex]?.focus();
    };

    const handleResend = () => {
        setTimeLeft(30);
        setIsActive(true);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
    };

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec : sec}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const otpValue = otp.join("");
        console.log("Verifying OTP:", otpValue);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex justify-center gap-2 sm:gap-4">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={(el) => {
                            inputRefs.current[index] = el;
                        }}
                        type="number"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        autoFocus={index === 0}
                        className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold border border-input rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm bg-background text-foreground"
                    />
                ))}
            </div>

            <div className="text-center">
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto px-10 py-6 text-sm font-medium tracking-wide uppercase rounded-sm shadow-lg hover:shadow-xl transition-all"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Verifying...
                        </>
                    ) : (
                        <>
                            <span className="w-1.5 h-1.5 rounded-full bg-background animate-pulse mr-2"></span>
                            Verify Code
                        </>
                    )}
                </Button>
            </div>

            <div className="text-center pt-2">
                <p className="text-xs text-muted-foreground">
                    Didn't receive the code?
                    {timeLeft > 0 ? (
                        <span className="font-semibold ml-1 text-foreground">
                            Resend in {formatTime(timeLeft)}
                        </span>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResend}
                            className="font-semibold hover:underline ml-1 text-foreground transition-all"
                        >
                            Resend Now
                        </button>
                    )}
                </p>
            </div>
        </form>
    );
}
