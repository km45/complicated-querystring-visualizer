from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities


def test_sample1():
    driver = webdriver.Remote(
        command_executor='http://selenium-hub:4444/wd/hub',
        desired_capabilities=DesiredCapabilities.FIREFOX.copy())
    driver.get("http://example.com/")

    # Use quit()
    # because pool is not closed and gets exhausted if use driver.close()
    driver.quit()
    assert True


def test_sample2():
    driver = webdriver.Remote(
        command_executor='http://selenium-hub:4444/wd/hub',
        desired_capabilities=DesiredCapabilities.FIREFOX.copy())
    driver.get("http://example.com/")
    driver.quit()
    assert True
