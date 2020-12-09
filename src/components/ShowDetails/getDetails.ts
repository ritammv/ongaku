import { getFromDiscogs } from '../../helpers/apiClientServer';

import Logo from '../../assets/Ongaku.svg';

export class Details {
  'id': string | null;

  'title': string | null;

  'thumb': string | null;

  'type': string | null;

  'country': string | null;

  'year': number | null;

  'user_data': {
    'in_wantlist': boolean | null;
    'in_collection': boolean | null;
  };

  'community': {
    'want': string | null;
    'have': string | null;
    'rating': { 
      'count': number;
      'average': number;
    }
  };

  'resource_url': string | null;

  'artists': {
    name: 'string';
    resource_url: string;
  }[] | null;

  'labels': {
    name: string;
    resource_url: string;
  }[];

  'genres': string[] | null;

  'styles': string[] | null;

  'num_for_sale': number | null;

  'lowest_price': string | null;

  'tracklist': {
    'title': string;
    'duration': number;
    'extraartists': {
      'name': string;
      'resource_url': string;
    }
  }[] | null;

  'notes': string | null;

  'profile': string;

  'name': string;

  'realname': string;
  
  'aliases': {
    name: string;
    resource_url: string;
  }[];

  'releases': {
    id: string;
    title: string;
    type: string;
    stats: {
      community: {
        in_wantlist: number;
        in_collection: number;
      }
      user: {
        in_wantlist: string;
        in_collection: number;
      }
    }
    resource_url: string;
  }[];

  'moreReleases': string;

  'videos': {
    description: string;
    uri: string;
    title: string;
  }[] | null;

  static async parse(route: string, user: User, type: string) {
    let moreInfo = await getFromDiscogs(`/${route}`, user.token, user.tokenSecret);
    if (type === 'masters' && moreInfo.main_release_url) {
      moreInfo = await getFromDiscogs(`/${moreInfo.main_release_url.split('.com/')[1]}`, user.token, user.tokenSecret);
      console.log('INFO FROM MAIN_RELEASe_URL', moreInfo);
    }
    let userData = {};
    if (type === 'releases' || type === 'masters') {
      const wantlist = await getFromDiscogs(`/users/${user.username}/wants?per_page=100`, user.token, user.tokenSecret);
      const collection = await getFromDiscogs(`/users/${user.username}/collection/${moreInfo.resource_url.split('.com/')[1]}`, user.token, user.tokenSecret);
      userData = {
        user_data: {
          in_wantlist: !!wantlist.wants.find((release: { id: number}) => release.id === moreInfo.id),
          in_collection: collection.releases.length !== 0,
        }
      };
    }
    if (type === 'artists' || type === 'labels') {
      moreInfo.thumb = moreInfo.images ?  moreInfo.images[0].uri : Logo;
      const releases = await getFromDiscogs(`/${moreInfo.releases_url.split('.com/')[1]}`, user.token, user.tokenSecret);
      moreInfo.moreReleases = releases.pagination.urls.next;
      moreInfo.releases = releases.releases;
    }
    if (!moreInfo.thumb) moreInfo.thumb = Logo;
    return Object.assign(new Details(), { ...moreInfo, ...userData });
  }
}