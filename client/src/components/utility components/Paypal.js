import React from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout';

const Paypal = (props) => {

    const onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        props.paymentSuccess(payment)
        console.log(payment);
                
    }

    const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        props.paymentCancelled(data)
    }

    const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
        props.paymentError(err)
    }

    let env = 'sandbox'; // you can set here to 'production' for production
    let currency = 'USD'; // or you can set this value from your props or state
    let total = props.total

    const client = {
        sandbox:    'AUFqIRWRF_67_gc1WEN-yRxcTwtkj1L9mR_6jHFiM23A0T_9QERZzDHAMAogbqDUjzwx43iNMcxgbRmW',
        production: 'YOUR-PRODUCTION-APP-ID',
    }
    return (
        <PaypalExpressBtn env={env} 
            client={client} 
            currency={currency} 
            total={total} 
            onError={onError} 
            onSuccess={onSuccess} 
            onCancel={onCancel} 
            style={{
                size: 'large',
                color: 'blue',
                shape: 'rect',
                label: 'checkout'
            }}
            />
    )
}

export default Paypal
