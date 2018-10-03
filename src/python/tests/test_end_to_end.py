from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.common.keys import Keys

_FILEPATH = '/usr/src/app/dist/development/index.html'
# _FILEPATH = '/usr/src/app/dist/production/index.html'

_BASIC_PARAMETERS_PARSED_GRID_BODY_CELLS_XPATH = '''//h2[contains(text(), 'Basic')]/..//div[contains(@class, 'ag-body')]//div[contains(@class, 'ag-cell')]'''

_GENERATE_BUTTON_XPATH = '''//button[contains(text(), 'generate')]'''
_PARSE_BUTTON_XPATH = '''//button[contains(text(), 'parse')]'''


class TestEndToEnd():
    def setup_method(self):
        self._driver = webdriver.Remote(
            command_executor='http://selenium-hub:4444/wd/hub',
            desired_capabilities=DesiredCapabilities.FIREFOX.copy())

    def teardown_method(self):
        self._driver.quit()

    def test_parse_when_opened_without_query(self):
        driver = self._driver

        # Open page without query
        driver.get('file://{}'.format(_FILEPATH))

        # Alias
        textarea = driver.find_element_by_tag_name('textarea')
        parse_button = driver.find_element_by_xpath(_PARSE_BUTTON_XPATH)

        # Initial state
        basic_body_cells = driver.find_elements_by_xpath(
            _BASIC_PARAMETERS_PARSED_GRID_BODY_CELLS_XPATH)

        assert textarea.text == ''
        assert len(basic_body_cells) == 0

        # Enter query into textarea
        textarea.clear()
        textarea.send_keys('a=b')

        assert textarea.text == 'a=b'

        # Click parse button
        parse_button.click()

        basic_body_cells = driver.find_elements_by_xpath(
            _BASIC_PARAMETERS_PARSED_GRID_BODY_CELLS_XPATH)

        assert textarea.text == 'a=b'
        assert len(basic_body_cells) == 2
        assert basic_body_cells[0].text == 'a'
        assert basic_body_cells[1].text == 'b'

    def test_generate_when_opened_with_query(self):
        driver = self._driver

        # Open page with query
        driver.get('file://{}?a=b'.format(_FILEPATH))

        # Alias
        textarea = driver.find_element_by_tag_name('textarea')
        generate_button = driver.find_element_by_xpath(_GENERATE_BUTTON_XPATH)

        # Initial state
        basic_body_cells = driver.find_elements_by_xpath(
            _BASIC_PARAMETERS_PARSED_GRID_BODY_CELLS_XPATH)

        assert textarea.text == 'a=b'
        assert len(basic_body_cells) == 2
        assert basic_body_cells[0].text == 'a'
        assert basic_body_cells[1].text == 'b'

        # Edit parsed query on grid
        cell = basic_body_cells[1]
        assert cell.text == 'b'

        cell.click()
        cell.send_keys('c')
        cell.send_keys(Keys.ENTER)
        assert cell.text == 'c'

        # Click generate button
        generate_button.click()

        basic_body_cells = driver.find_elements_by_xpath(
            _BASIC_PARAMETERS_PARSED_GRID_BODY_CELLS_XPATH)

        assert textarea.text == 'a=c'
        assert len(basic_body_cells) == 2
        assert basic_body_cells[0].text == 'a'
        assert basic_body_cells[1].text == 'c'

    def test_grid_data_reference_problem(self):
        # TODO: Implement test for following problem:
        # // Change reference for data even if contents are same,
        # // otherwise following problem happens.
        # //
        # // 1. Parse url "a=b" for the first time.
        # //   1.1. Allocate memory for parsed data. Call it "Data1".
        # //   1.2. This class refers "Data1".
        # //   1.3. AgGrid refers "Data1".
        # // 2. Parse url "localhost/?a=b" for the second time.
        # //   2.1. Allocate memory for parsed data. Call it "Data2".
        # //   2.2. This class changes to refer "Data2"
        # //        because setState() is called explicitly. (above)
        # //   2.3. AgGrid remains referring "Data1"
        # //        because contents are not changed.
        # // 3. Edit grid data "Data2"
        # // 4. Generate url from "Data1" and not used grid data.
        pass
