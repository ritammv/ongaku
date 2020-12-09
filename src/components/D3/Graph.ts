import { getFromDiscogs } from '../../helpers/apiClientServer';

export interface D3Node {
  'id': string;
  'name': string;
  'resource_url'?: string;
  'type': string;
}

export interface D3Link {
  'source': string;
  'target': string;
}

interface Alias {
  id: string;
  name: string;
  resource_url: string;
}

interface Track {
  title: string;
}

interface Label {
  name: string;
  resource_url: string;
  id: string;
}

interface Artist {
  id: string;
  name: string;
  resource_url: string;
}

export class Graph {
  'D3Node': D3Node[] = [];

  'D3Link': D3Link[] = [];

  async addReleases(url: string, type: string, token: string, tokenSecret: string, source: string) {
    const releases = await getFromDiscogs(url.split('.com')[1], token, tokenSecret);
    console.log(url, releases);
    releases.releases.forEach((release: ReleaseDetail) => {
      this.D3Node.push(
        { id: release.id, resource_url: release.resource_url, name: release.title, type }
      );
      this.D3Link.push({ source, target: release.title });
    });
  }

  async addToGraph(type: string, id: string, token: string, tokenSecret: string, first?: boolean) {
    const data = await getFromDiscogs(`/${type}/${id}`, token, tokenSecret);
    console.log(data);
    let source: string;
    if (type === 'artists') {
      source = data.name;
      if (first) {
        this.D3Node.push({ id: data.id, name: source, resource_url: data.resource_url, type });
      }
      await this.addReleases(data.releases_url, type, token, tokenSecret, source);
      data.aliases.forEach((alias: Alias) => {
        this.D3Node.push(
          { id: alias.id, name: alias.name, resource_url: alias.resource_url, type: 'alias' }
        );
        this.D3Link.push(
          { source, target: alias.name }
        );
      });
    }
    if (type === 'labels') {
      source = data.name;
      if (first) {
        this.D3Node.push({ id: data.id, name: source, resource_url: data.resource_url, type });
      }
      await this.addReleases(data.releases_url, type, token, tokenSecret, source);
    }
    if (type === 'releases' || type === 'masters') {
      source = data.title;
      if (first) {
        this.D3Node.push({ id: data.id, name: source, resource_url: data.resource_url, type });
      }
      console.log(data);
      data.tracklist.forEach((track: Track, i: number) => {
        this.D3Node.push({ id: track.title, name: track.title, type: 'track' });
        this.D3Link.push({ source, target: track.title });
      });
      data.artists.forEach((artist: Artist) => {
        this.D3Node.push({ id: artist.id, name: artist.name, resource_url: data.resource_url, type: 'artists' });
        this.D3Link.push({ source, target: artist.name });
      });
      if (type === 'masters') {
        const moreInfo = await getFromDiscogs(data.main_release_url.split('.com')[1], token, tokenSecret);
        console.log(moreInfo);
        moreInfo.labels.forEach((label: Label) => {
          this.D3Node.push({ id: label.id, name: label.name, resource_url: moreInfo.resource_url, type: 'labels' });
          this.D3Link.push({ source, target: label.name });
        });
      } else {
        data.labels.forEach((label: Label) => {
          this.D3Node.push({ id: label.id, name: label.name, resource_url: data.resource_url, type: 'labels' });
          this.D3Link.push({ source, target: label.name });
        });
      }
    }
    return this;
  }
}