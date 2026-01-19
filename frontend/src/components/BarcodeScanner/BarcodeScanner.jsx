/**
 * BarcodeScanner Component
 * Camera-based barcode scanner using html5-qrcode library
 */

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import './BarcodeScanner.css';

function BarcodeScanner({ isOpen, onClose, onScan }) {
    const [error, setError] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [debugInfo, setDebugInfo] = useState('');
    const scannerRef = useRef(null);
    const html5QrCodeRef = useRef(null);

    // Initialize and start scanner when opened
    useEffect(() => {
        if (isOpen) {
            // Small delay to ensure DOM is ready
            const timer = setTimeout(() => {
                startScanner();
            }, 100);
            return () => clearTimeout(timer);
        }

        // Cleanup on unmount or close
        return () => {
            stopScanner();
        };
    }, [isOpen]);

    // Start the barcode scanner
    const startScanner = async () => {
        setError(null);
        setDebugInfo('Initializing camera...');

        try {
            // Wait for DOM element to be available
            const scannerElement = document.getElementById('barcode-scanner-region');
            if (!scannerElement) {
                setDebugInfo('Waiting for scanner element...');
                setTimeout(startScanner, 200);
                return;
            }

            // Clean up any existing scanner
            if (html5QrCodeRef.current) {
                try {
                    await html5QrCodeRef.current.stop();
                    html5QrCodeRef.current.clear();
                } catch (e) {
                    // Ignore cleanup errors
                }
            }

            // Create scanner instance with supported barcode formats
            html5QrCodeRef.current = new Html5Qrcode('barcode-scanner-region', {
                formatsToSupport: [
                    Html5QrcodeSupportedFormats.EAN_13,
                    Html5QrcodeSupportedFormats.EAN_8,
                    Html5QrcodeSupportedFormats.UPC_A,
                    Html5QrcodeSupportedFormats.UPC_E,
                    Html5QrcodeSupportedFormats.CODE_128,
                    Html5QrcodeSupportedFormats.CODE_39,
                    Html5QrcodeSupportedFormats.CODE_93,
                    Html5QrcodeSupportedFormats.CODABAR,
                    Html5QrcodeSupportedFormats.ITF,
                    Html5QrcodeSupportedFormats.QR_CODE,
                ],
                verbose: false
            });

            // Get available cameras
            const cameras = await Html5Qrcode.getCameras();
            setDebugInfo(`Found ${cameras.length} camera(s)`);

            if (cameras.length === 0) {
                setError('No cameras found on this device.');
                return;
            }

            // Configuration for barcode scanning - optimized for detection
            const config = {
                fps: 15,  // Higher FPS for better detection
                qrbox: (viewfinderWidth, viewfinderHeight) => {
                    // Use 80% of the smaller dimension for the scanning box
                    const minDimension = Math.min(viewfinderWidth, viewfinderHeight);
                    const boxSize = Math.floor(minDimension * 0.8);
                    return {
                        width: boxSize,
                        height: Math.floor(boxSize * 0.5)  // Rectangular for barcodes
                    };
                },
                aspectRatio: 1.777778,  // 16:9 aspect ratio
                disableFlip: false,
                experimentalFeatures: {
                    useBarCodeDetectorIfSupported: true  // Use native detector if available
                }
            };

            // Success callback when barcode is scanned
            const onScanSuccess = (decodedText, decodedResult) => {
                console.log('Barcode scanned:', decodedText, decodedResult);
                setDebugInfo(`Detected: ${decodedText}`);

                // Vibrate if supported (mobile feedback)
                if (navigator.vibrate) {
                    navigator.vibrate(200);
                }

                stopScanner();
                onScan(decodedText);
            };

            // Error callback
            const onScanError = (errorMessage) => {
                // Only log occasionally to avoid spam, but keep scanning
                // These errors are normal - they just mean no barcode was detected in this frame
            };

            setDebugInfo('Starting camera...');
            setIsScanning(true);

            // Try to use back camera first, fall back to first available
            try {
                await html5QrCodeRef.current.start(
                    { facingMode: 'environment' },
                    config,
                    onScanSuccess,
                    onScanError
                );
                setDebugInfo('Camera active - point at barcode');
            } catch (backCameraError) {
                console.log('Back camera failed, trying first available camera');
                setDebugInfo('Trying alternate camera...');

                // Try the first available camera
                if (cameras.length > 0) {
                    await html5QrCodeRef.current.start(
                        cameras[0].id,
                        config,
                        onScanSuccess,
                        onScanError
                    );
                    setDebugInfo('Camera active - point at barcode');
                } else {
                    throw backCameraError;
                }
            }

        } catch (err) {
            console.error('Scanner error:', err);
            setError(getErrorMessage(err));
            setIsScanning(false);
            setDebugInfo(`Error: ${err.message || err}`);
        }
    };

    // Stop the barcode scanner
    const stopScanner = async () => {
        if (html5QrCodeRef.current) {
            try {
                const state = html5QrCodeRef.current.getState();
                // State 2 = SCANNING, State 3 = PAUSED
                if (state === 2 || state === 3) {
                    await html5QrCodeRef.current.stop();
                }
                html5QrCodeRef.current.clear();
            } catch (err) {
                console.error('Error stopping scanner:', err);
            }
            html5QrCodeRef.current = null;
        }
        setIsScanning(false);
        setDebugInfo('');
    };

    // Get user-friendly error message
    const getErrorMessage = (err) => {
        const errorStr = String(err);

        if (errorStr.includes('NotAllowedError') || errorStr.includes('Permission')) {
            return 'Camera access denied. Please allow camera permissions and try again.';
        }
        if (errorStr.includes('NotFoundError') || errorStr.includes('Requested device not found')) {
            return 'No camera found. Please make sure your device has a camera.';
        }
        if (errorStr.includes('NotReadableError')) {
            return 'Camera is in use by another application. Please close other apps using the camera.';
        }
        if (errorStr.includes('OverconstrainedError')) {
            return 'Could not access camera with requested settings.';
        }
        if (errorStr.includes('AbortError')) {
            return 'Camera access was aborted. Please try again.';
        }

        return `Camera error: ${errorStr.substring(0, 100)}. Try entering the barcode manually.`;
    };

    // Handle close button
    const handleClose = () => {
        stopScanner();
        onClose();
    };

    // Don't render if not open
    if (!isOpen) return null;

    return (
        <div className="barcode-scanner-overlay">
            <div className="barcode-scanner-modal">
                {/* Header */}
                <div className="barcode-scanner-header">
                    <h3 className="barcode-scanner-title">
                        📷 Scan Barcode
                    </h3>
                    <button
                        className="barcode-scanner-close"
                        onClick={handleClose}
                        aria-label="Close scanner"
                    >
                        ✕
                    </button>
                </div>

                {/* Scanner Area */}
                <div className="barcode-scanner-content">
                    {error ? (
                        <div className="barcode-scanner-error">
                            <span className="error-icon">⚠️</span>
                            <p>{error}</p>
                            <button className="btn btn-primary" onClick={startScanner}>
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <>
                            <div
                                id="barcode-scanner-region"
                                ref={scannerRef}
                                className="barcode-scanner-region"
                            ></div>

                            <div className="barcode-scanner-instructions">
                                <p>Position the barcode within the frame</p>
                                {isScanning && (
                                    <div className="scanning-indicator">
                                        <span className="scanning-dot"></span>
                                        {debugInfo || 'Scanning...'}
                                    </div>
                                )}
                                <p className="scanner-tips">
                                    💡 Tips: Hold steady, ensure good lighting, fill the frame with barcode
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="barcode-scanner-footer">
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BarcodeScanner;
