import { assert } from 'chai';
import { ACHIEVEMENT_BEN } from '../../../client/modules/constants/enum';

import {
  getPicturePlaceholder,
  getProfileUrl,
  getPicture,
  getName,
  getShortName,
  formatBirthday,
  isActiveUser,
} from '../../../client/modules/utils/user';


describe('modules/utils/user', () => {
  it('getPicturePlaceholder', () => {
    const user = { id: 1 };
    const picturePlaceholder = getPicturePlaceholder(user);
    const secondPicturePlaceholder = getPicturePlaceholder(user);

    assert.equal(picturePlaceholder, secondPicturePlaceholder, 'the same url on each call');
  });

  it('getProfileUrl', () => {
    const user = { id: 1 };
    const orgUser = { id: 1, organization_profile_id: 5 };

    assert.equal(getProfileUrl(user), '/profile/1', 'get user url');
    assert.equal(getProfileUrl(orgUser), '/organizations/5', 'get organization url');
  });

  it('getPicture', () => {
    const userWithPic = { id: 1, photo_url: 'avatar.jpg' };

    const userWithoutPic = { id: 2 };
    const userWithoutPicPlaceholder = getPicturePlaceholder(userWithoutPic);

    assert.equal(getPicture(userWithPic), 'avatar.jpg', 'get photo_url field');
    assert.equal(getPicture(userWithoutPic), userWithoutPicPlaceholder, 'placeholder if there is no image');
  });

  it('getName', () => {
    const user = {
      firstname: 'Petya',
      lastname: 'Ivanov',
    };

    const user2 = {
      firstname: 'Petya',
      lastname: 'Ivanov',
      is_organization_user: true,
    };

    assert.equal(getName(user), 'Petya Ivanov', 'full name');
    assert.equal(getName(user2), 'Petya', 'organization user');
  });

  it('getShortName', () => {
    const user = {
      firstname: 'Petya',
      lastname: 'Ivanov',
    };

    const user2 = {
      firstname: 'Petya',
      lastname: 'Ivanov',
      is_organization_user: true,
    };

    assert.equal(getShortName(user), 'Petya I.', 'firstname and first letter of lastname');
    assert.equal(getShortName(user2), 'Petya', 'organization user');
  });

  it('formatBirthday', () => {
    const user = {
      birth_day: 12,
      birth_month: 3,
      birth_year: 1995,
      privacy_show_year_of_birth: true,
    };

    const hiddenYearUser = {
      birth_day: 12,
      birth_month: 3,
      birth_year: 1995,
      privacy_show_year_of_birth: false,
    };

    const mask = 'DD-MM';
    const maskFull = 'DD-MM-YYYY';

    assert.equal(formatBirthday(user, mask, maskFull), '12-03-1995');
    assert.equal(formatBirthday(hiddenYearUser, mask, maskFull), '12-03');
  });

  it('isActiveUser', () => {
    assert.isFalse(isActiveUser({}), 'no achievements prop');
    assert.isFalse(isActiveUser({ achievements: [] }), 'not achievements');
    assert.isTrue(isActiveUser({ achievements: [ACHIEVEMENT_BEN] }), 'user has BEN achievement');
  });
});
