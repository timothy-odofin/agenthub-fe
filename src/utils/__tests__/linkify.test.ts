/**
 * Linkify Utility Tests
 * 
 * Comprehensive test suite for URL detection and linkification functionality.
 * Tests cover various URL formats, edge cases, security scenarios, and markdown links.
 * 
 * @jest-environment jsdom
 */

import {
  parseLinkifiedContent,
  isValidUrl,
  normalizeUrl,
  extractDomain,
  sanitizeUrl,
  type LinkifiedSegment,
} from '../linkify';

describe('linkify utilities', () => {
  describe('isValidUrl', () => {
    it('should validate standard HTTP URLs', () => {
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://example.com')).toBe(true);
    });

    it('should validate www-prefixed URLs', () => {
      expect(isValidUrl('www.example.com')).toBe(true);
    });

    it('should validate URLs with paths and query params', () => {
      expect(isValidUrl('https://example.com/path?param=value')).toBe(true);
    });

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not a url')).toBe(false);
      expect(isValidUrl('ftp://example.com')).toBe(false);
    });

    it('should reject javascript: protocol', () => {
      expect(isValidUrl('javascript:alert(1)')).toBe(false);
    });
  });

  describe('normalizeUrl', () => {
    it('should add https:// to www URLs', () => {
      expect(normalizeUrl('www.example.com')).toBe('https://www.example.com');
    });

    it('should keep existing protocol', () => {
      expect(normalizeUrl('https://example.com')).toBe('https://example.com');
      expect(normalizeUrl('http://example.com')).toBe('http://example.com');
    });
  });

  describe('extractDomain', () => {
    it('should extract domain from URL', () => {
      expect(extractDomain('https://example.com/path')).toBe('example.com');
      expect(extractDomain('https://subdomain.example.com')).toBe('subdomain.example.com');
    });

    it('should handle www prefix', () => {
      expect(extractDomain('www.example.com')).toBe('www.example.com');
    });

    it('should return original for invalid URLs', () => {
      expect(extractDomain('not a url')).toBe('not a url');
    });
  });

  describe('sanitizeUrl', () => {
    it('should allow safe URLs', () => {
      expect(sanitizeUrl('https://example.com')).toBe('https://example.com');
      expect(sanitizeUrl('http://example.com')).toBe('http://example.com');
    });

    it('should block dangerous protocols', () => {
      expect(sanitizeUrl('javascript:alert(1)')).toBeNull();
      expect(sanitizeUrl('data:text/html,<script>alert(1)</script>')).toBeNull();
      expect(sanitizeUrl('vbscript:msgbox')).toBeNull();
    });
  });

  describe('parseLinkifiedContent', () => {
    it('should handle empty or null input', () => {
      const result = parseLinkifiedContent('');
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('text');
    });

    it('should parse text with single URL', () => {
      const result = parseLinkifiedContent('Check out https://example.com for info');
      
      expect(result).toHaveLength(3);
      expect(result[0].type).toBe('text');
      expect(result[0].content).toBe('Check out ');
      expect(result[1].type).toBe('link');
      expect(result[1].url).toBe('https://example.com');
      expect(result[2].type).toBe('text');
      expect(result[2].content).toBe(' for info');
    });

    it('should parse text with multiple URLs', () => {
      const text = 'Visit https://example.com and https://test.com';
      const result = parseLinkifiedContent(text);
      
      const links = result.filter(s => s.type === 'link');
      expect(links).toHaveLength(2);
      expect(links[0].url).toBe('https://example.com');
      expect(links[1].url).toBe('https://test.com');
    });

    it('should handle www-prefixed URLs', () => {
      const result = parseLinkifiedContent('Visit www.example.com');
      
      const link = result.find(s => s.type === 'link');
      expect(link).toBeDefined();
      expect(link?.url).toBe('https://www.example.com');
    });

    it('should parse Jira-style URLs correctly', () => {
      const text = 'SCRUM-15 — https://aioyejide.atlassian.net/browse/SCRUM-15';
      const result = parseLinkifiedContent(text);
      
      const link = result.find(s => s.type === 'link');
      expect(link).toBeDefined();
      expect(link?.url).toBe('https://aioyejide.atlassian.net/browse/SCRUM-15');
    });

    it('should handle markdown links [text](url)', () => {
      const result = parseLinkifiedContent('Click [here](https://example.com) for more');
      
      const link = result.find(s => s.type === 'link');
      expect(link).toBeDefined();
      expect(link?.content).toBe('here');
      expect(link?.url).toBe('https://example.com');
    });

    it('should handle URLs with query parameters', () => {
      const text = 'Search: https://example.com/search?q=test&page=1';
      const result = parseLinkifiedContent(text);
      
      const link = result.find(s => s.type === 'link');
      expect(link).toBeDefined();
      expect(link?.url).toContain('?q=test&page=1');
    });

    it('should handle URLs with fragments', () => {
      const text = 'Go to https://example.com/page#section';
      const result = parseLinkifiedContent(text);
      
      const link = result.find(s => s.type === 'link');
      expect(link).toBeDefined();
      expect(link?.url).toContain('#section');
    });

    it('should preserve line breaks', () => {
      const text = 'Line 1\nhttps://example.com\nLine 3';
      const result = parseLinkifiedContent(text);
      
      expect(result.some(s => s.content.includes('\n'))).toBe(true);
    });

    it('should handle text with no URLs', () => {
      const text = 'This is plain text without any links.';
      const result = parseLinkifiedContent(text);
      
      expect(result).toHaveLength(1);
      expect(result[0].type).toBe('text');
      expect(result[0].content).toBe(text);
    });

    it('should handle URLs at start and end of text', () => {
      const text = 'https://start.com middle https://end.com';
      const result = parseLinkifiedContent(text);
      
      const links = result.filter(s => s.type === 'link');
      expect(links).toHaveLength(2);
      expect(result[0].type).toBe('link');
      expect(result[result.length - 1].type).toBe('link');
    });

    it('should assign unique IDs to each segment', () => {
      const text = 'Visit https://example.com and https://test.com';
      const result = parseLinkifiedContent(text);
      
      const ids = result.map(s => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should handle complex Jira output format', () => {
      const text = `List of issues:
- SCRUM-15 — [FE] Add functionalities — In Progress — https://aioyejide.atlassian.net/browse/SCRUM-15
- SCRUM-3 — [BE] Design project — In Progress — https://aioyejide.atlassian.net/browse/SCRUM-3`;
      
      const result = parseLinkifiedContent(text);
      const links = result.filter(s => s.type === 'link');
      
      expect(links).toHaveLength(2);
      expect(links[0].url).toContain('SCRUM-15');
      expect(links[1].url).toContain('SCRUM-3');
    });
  });
});
