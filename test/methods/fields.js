const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const SDK = require('../../remote');

describe('Fields', function() {
  let client;

  beforeEach(function() {
    client = new SDK({
      url: 'https://demo-api.getdirectus.com'
    });

    const responseJSON = {
      data: {
        data: {}
      }
    };

    sinon.stub(client, 'get').resolves(responseJSON);
    sinon.stub(client, 'put').resolves(responseJSON);
    sinon.stub(client, 'patch').resolves(responseJSON);
    sinon.stub(client, 'post').resolves(responseJSON);
    sinon.stub(client, 'delete').resolves(responseJSON);
  });

  afterEach(function() {
    client.get.restore();
    client.put.restore();
    client.patch.restore();
    client.post.restore();
    client.delete.restore();
  });

  describe('#getFields()', function() {
    it('Errors on missing `collection` parameter', function() {
      expect(client.getFields).to.throw();
    });

    it('Errors if parameter `params` is of a wrong type', function() {
      expect(() => client.getFields('projects', 'params')).to.throw();
    });

    it('Calls get() for the right endpoint', function() {
      client.getFields('projects', { limit: 50 });
      expect(client.get).to.have.been.calledWith('/fields/projects', { limit: 50 });
    });
  });

  describe('#getField()', function() {
    it('Errors on missing `collection` parameter', function() {
      expect(client.getField).to.throw();
    });

    it('Errors on missing `fieldName` parameter', function() {
      expect(() => client.getField('projects')).to.throw();
    });

    it('Calls get() for the right endpoint', function() {
      client.getField('projects', 'title', { fields: 'interface' });
      expect(client.get).to.have.been.calledWith('/fields/projects/title', { fields: 'interface' });
    });
  });

  describe('#createField()', function() {
    it('Errors on missing `collection` parameter', function() {
      expect(client.createField).to.throw();
    });

    it('Errors on missing `fieldInfo` parameter', function() {
      expect(() => client.createField('collection')).to.throw();
    });

    it('Calls post() for the right endpoint', function() {
      client.createField('members', {
        field: 'first_name',
        interface: 'text-input'
      });
      expect(client.post).to.have.been.calledWith('/fields/members', {
        field: 'first_name',
        interface: 'text-input'
      });
    });
  });

  describe('#updateField()', function() {
    it('Errors on missing `collection` parameter', function() {
      expect(client.updateField).to.throw();
    });

    it('Errors on missing `fieldName` parameter', function() {
      expect(() => client.updateField('collection')).to.throw();
    });

    it('Errors on missing `fieldInfo` parameter', function() {
      expect(() => client.updateField('members', 'first_name')).to.throw();
    });

    it('Calls patch() for the right endpoint', function() {
      client.updateField('members', 'first_name', {
        field: 'first_name',
        interface: 'text-input'
      });
      expect(client.patch).to.have.been.calledWith('/fields/members/first_name', {
        field: 'first_name',
        interface: 'text-input'
      });
    });
  });
});
