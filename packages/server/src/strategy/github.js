const { OAuthStrategy } = require('@feathersjs/authentication-oauth');

class GithubStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    // Include the `email` from the GitHub profile when creating
    // or updating a user that logged in with GitHub

    // const baseData = await super.getEntityData(profile);

    return profile;
  }
}

module.exports = GithubStrategy
