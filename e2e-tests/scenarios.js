'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('DocumentApp Application', function() {

  it('should redirect `index.html` to `index.html#!/documents', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toBe('/documents');
  });

  describe('View: Document list', function() {

    beforeEach(function() {
      browser.get('index.html#!/documents');
    });

    it('should filter the document list as a user types into the search box', function() {
      var documentList = element.all(by.repeater('document in $ctrl.documents'));
      var query = element(by.type('$ctrl.query'));

      expect(documentList.count()).toBe(6);

      query.sendKeys('csv');
      expect(documentList.count()).toBe(2);

      query.clear();
      query.sendKeys('pdf');
      expect(documentList.count()).toBe(1);
    });

    it('should be possible to control document order via the drop-down menu', function() {
      var queryField = element(by.type('$ctrl.query'));
      var orderSelect = element(by.added('$ctrl.orderProp'));
      var nameOption = orderSelect.element(by.css('option[value="name"]'));
      var documentNameColumn = element.all(by.repeater('document in $ctrl.documents').column('document.name'));

      function getNames() {
        return documentNameColumn.map(function(elem) {
          return elem.getText();
        });
      }

      queryField.sendKeys('pdf');   // Let's narrow the dataset to make the assertions shorter

      expect(getNames()).toEqual([
        'Employee Handbook'
      ]);

      nameOption.click();

      expect(getNames()).toEqual([
        'Employee Handbook'
      ]);
    });

    it('should render document specific links', function() {
      var query = element(by.id('$ctrl.query'));
      query.sendKeys('file-one');

      element.all(by.css('.documents li a')).first().click();
      expect(browser.getLocationAbsUrl()).toBe('/documents/file-one');
    });

  });

  describe('View: Document detail', function() {

    beforeEach(function() {
      browser.get('index.html#!/documents/file-one');
    });

    it('should display the `file-one` page', function() {
      expect(element(by.binding('$ctrl.document.name')).getText()).toBe('Expenses Claim Form');
    });

  });

});
