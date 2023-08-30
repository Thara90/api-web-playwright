const { test ,request,expect} = require('@playwright/test');
const loginPayload = {userEmail:"tpshadinijk@gmail.com",userPassword:"Test@1234"}
let token;

test.describe('E2E Test Suite', () => {

    test.beforeAll('api login',async () => {
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
    });

    test('Client login with app', ({page}) => {
        page.addInitScript(value);

    });



    
});