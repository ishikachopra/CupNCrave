import React, { useState } from 'react';
import { CardPaymentForm } from './cardPaymentForm';
import { CashOnDeliveryForm } from './cashOnDeliveryForm';
import { RazorpayPayment } from './razorpayPayment';
import './payment.css';

const PaymentForm = () => {
    const [paymentMethod, setPaymentMethod] = useState('cash'); // 'card', 'cash', or 'razorpay'

    const handleToggle = (method) => {
        setPaymentMethod(method);
    };

    return (
        <div className="container-payment">
            <div className="toggle-buttons">
                <button
                    className={paymentMethod === 'cash' ? 'active' : ''}
                    onClick={() => handleToggle('cash')}
                >
                    Cash on Delivery
                </button>
                
                <button
                    className={paymentMethod === 'razorpay' ? 'active' : ''}
                    onClick={() => handleToggle('razorpay')}
                >
                    Razorpay Payment
                </button>

                <button
                    className={paymentMethod === 'card' ? 'active' : ''}
                    onClick={() => handleToggle('card')}
                >
                    Card Payment
                </button>
                
            </div>

            {paymentMethod === 'card' && <CardPaymentForm />}
            {paymentMethod === 'cash' && <CashOnDeliveryForm />}
            {paymentMethod === 'razorpay' && <RazorpayPayment />}
        </div>
    );
};

export default PaymentForm;
