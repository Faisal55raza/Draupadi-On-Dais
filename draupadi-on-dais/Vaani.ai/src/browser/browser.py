from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

driver: webdriver.Chrome | None = None


def getDriver() -> webdriver.Chrome:
    global driver
    if driver is not None:
        return driver

    # Starting up selenium web driver.
    chrome_browser_options = Options()
    chrome_browser_options.add_experimental_option("useAutomationExtension", False)
    chrome_browser_options.add_experimental_option(
        "excludeSwitches", ["enable-automation"]
    )
    chrome_browser_options.add_argument("--ignore-ssl-errors=yes")
    chrome_browser_options.add_argument("--ignore-certificate-errors")
    # chrome_browser_options.add_argument("--start-fullscreen")

    driver = webdriver.Chrome(options=chrome_browser_options)
    return driver


def setup():
    driver = getDriver()
    driver.get("https://www.linkedin.com")
    _ = input("Do your thing boi...")
    driver.quit()


def linkedin_try():
    driver = getDriver()
    driver.get("https://www.linkedin.com")
    post_element = driver.find_element(By.XPATH, '//*[@id="ember689"]')
    post_element.click()
    import time
    time.sleep(10)
    input_field = driver.find_element(By.XPATH, '/html/body/div[3]/div/div/div/div[2]/div/div[2]/div[1]/div/div/div/div/div/div/div[1]/p')
    input_field.send_keys("Hello World")
    post_button = driver.find_element(By.XPATH, '//*[@id="ember1033"]')
    post_button.click()
    _ = input("Do your thing boi...")
    driver.quit()

