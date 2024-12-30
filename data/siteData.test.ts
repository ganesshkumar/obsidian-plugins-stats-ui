import { SiteData } from './siteData';

describe('SiteData', () => {
  it('should have highlights', () => {
    expect(SiteData.highlights).toBeDefined();
    expect(SiteData.highlights.length).toBeGreaterThan(0);
  });

  it('should have faqs', () => {
    expect(SiteData.faqs).toBeDefined();
    expect(SiteData.faqs.length).toBeGreaterThan(0);
  });
});
