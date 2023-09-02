const { test ,request,expect} = require('@playwright/test');
const loginPayload = {userEmail:"tpshadinijk@gmail.com",userPassword:"Test@1234"}
const orderPayload = {orders:[{country:"Cuba",productOrderedId:"6262e95ae26b7e1a10e89bf0"}]}
let token,orderid;

test.describe('E2E Test Suite', () => {

    test.beforeAll(async () => {

        //Login API
        const apiContext = await request.newContext();
        const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data:loginPayload
        }
        )
        expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson =  await loginResponse.json();
        token = loginResponseJson.token;
        console.log(token);    

        //Order API
        const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data : orderPayload,
            headers : {
                'Authorization' : token,
                'Content-Type' : 'application/json'
            }
        }
        )
        const orderResponseJson =  await orderResponse.json();
        orderid = orderResponseJson.orders[0];
        console.log(orderResponseJson);
    });

    test('Load dashboard', async ({page}) => {
        page.addInitScript(value=> {
            window.localStorage.setItem('token',value );
        },token);
        await page.goto("https://rahulshettyacademy.com/client/");
    });

    test.only('Verify order ID', async ({page}) => {
        page.addInitScript(value=> {
            window.localStorage.setItem('token',value );
        },token);
        await page.goto("https://rahulshettyacademy.com/client/dashboard/myorders");
        await page.goto(`https://rahulshettyacademy.com/client/dashboard/order-details/${orderid}`);

    });



    
});