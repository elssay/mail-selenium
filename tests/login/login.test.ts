import { Builder, WebDriver, Capabilities, By } from 'selenium-webdriver';

interface IAssert {
  equal: (actual: Object, expected: Object) => void;
}

require('chromedriver');
const assert: IAssert = require('assert');

let capabilities = Capabilities.chrome();

capabilities.set('goog:chromeOptions', {
  args: [
    '--lang=en',
    'disable-infobars',
    '--disable-plugins',
    //'--headless' // <- use GUI or only console
  ]
});

describe('BAD - Authorization', function () {
  let driver: WebDriver;

  before(async function () {
    driver = await new Builder().withCapabilities(capabilities).build();
   });

  it('test as example autotest', async function () {
    await driver.get('https://mail.ru/?utm_source=portal&utm_medium=portal_navigation&utm_campaign=mail.ru');
    await driver.sleep(300);
    driver.findElement(By.css('.email-input.svelte-1eyrl7y')).sendKeys('svetlana_nikoli@mail.ru');
    
    (await driver.findElement(By.css('.button.svelte-1eyrl7y'))).click();
    await driver.sleep(1000);
    driver.findElement(By.css('.password-input.svelte-1eyrl7y')).sendKeys('150992el');
    await driver.sleep(1000);
    (await driver.findElement(By.css('.second-button.svelte-1eyrl7y'))).click();
    // Ввели Логин и пароль, зашли в систему
    await driver.sleep(10000);
    (await driver.findElement(By.css('[class = "compose-button__ico"] [fill-rule="evenodd"]'))).click();
    await driver.sleep(2000);
    (await  driver.findElement(By.css('[class = "container--H9L5q size_s_compressed--2c-eV"][tabindex="100"]'))).sendKeys('svetlana_nikoli@mail.ru');
    await driver.sleep(2000);
    (await  driver.findElement(By.css('[class = "container--H9L5q size_s_compressed--2c-eV"][tabindex="400"]'))).sendKeys('svetlana_nikoli@mail.ru');
    await driver.sleep(2000);
    (await driver.findElement(By.css('.cke_editable div'))).sendKeys('hello');
    await driver.sleep(1000);
    (await driver.findElement(By.css('[class = "button2__wrapper"][tabindex="570"]'))).click();
    await driver.sleep(1000);
    
    driver.findElement(By.css('[ng-model="ctrl.unit.fam"]')).sendKeys('Рыжий'); // Фамилия 
    driver.findElement(By.css('[ng-model="ctrl.unit.name"]')).sendKeys('Кот'); // Имя
    driver.findElement(By.css('[placeholder="31"]')).sendKeys('3'); // день
    driver.findElement(By.css('[placeholder="01"]')).sendKeys('4'); // месяц
    driver.findElement(By.css('[placeholder="1901"]')).sendKeys('1994'); // год
    await driver.sleep(1000);
    (await driver.findElement(By.css('[ng-click="ctrl.save()"]'))).click(); //Сохранили
    (await driver.findElement(By.css('[ng-click="exit()"]'))).click(); // Выход из учётки
    await driver.sleep(3000);
    
    driver.findElement(By.css('[ng-model="ctrl.email"]')).sendKeys('w@w.w');
    driver.findElement(By.css(('[ng-model="ctrl.password"]'))).sendKeys('w');
    (await driver.findElement(By.css('[type="button"]'))).click();
    await driver.sleep(3000);

    // Снова вошли  систему 
    // Видим свою запись


    let authorizationPasswordInput = driver.findElement(By.xpath(`//div[contains(@class, 'pointer')][./div[contains(text(), '14:30')]][./div[contains(text(), 'Кот Кот / 1994.4.3 /')]]`));
    let exitAuthorizationPasswordInput = authorizationPasswordInput.then(() => true, () => false);
    await assert.equal(await exitAuthorizationPasswordInput, true);
   });

   xit('Login with incorrect data', async function () {
    await driver.get('http://lab2.webtm.ru');
    driver.findElement(By.css('[ng-model="ctrl.email"]')).sendKeys('w@w.w');
    driver.findElement(By.css('[ng-model="ctrl.password"]')).sendKeys('1111111111');
    (await driver.findElement(By.css('[type="button"]'))).click()
    await driver.sleep(1000);
    let authorizationPasswordInput = driver.findElement(By.css('[ng-model="ctrl.password"]'));
    let exitAuthorizationPasswordInput = authorizationPasswordInput.then(() => true, () => false);
    await assert.equal(await exitAuthorizationPasswordInput, false);
  });

  xit('Login with correct data', async function () {
    await driver.get('http://lab2.webtm.ru');
    driver.findElement(By.css('[ng-model="ctrl.email"]')).sendKeys('w@w.w');
    driver.findElement(By.css('[ng-model="ctrl.password"]')).sendKeys('w');
    (await driver.findElement(By.css('[type="button"]'))).click()
    await driver.sleep(1000);
    let authorizationPasswordInput = driver.findElement(By.css('[ng-model="ctrl.password"]'));
    let exitAuthorizationPasswordInput = authorizationPasswordInput.then(() => true, () => false);
    await assert.equal(await exitAuthorizationPasswordInput, true);
  });


  after(() => driver && driver.quit());
});
