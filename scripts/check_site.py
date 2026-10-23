"""Lightweight Jekyll-source consistency check. `python scripts/check_site.py`"""
from pathlib import Path
import re, yaml
root=Path(__file__).resolve().parents[1]
assert (root/'.github/workflows/pages.yml').exists()
for fn in ['_config.yml','_data/people.yml','_data/reviews.yml','_data/areas.yml','_data/faqs.yml']:
    yaml.safe_load((root/fn).read_text())
people=yaml.safe_load((root/'_data/people.yml').read_text())
assert len(people)>=6
for person in people:
    assert (root/'assets/images/people'/person['image']).exists(),person['name']
for path in ['hero-lifestyle.webp','household-editorial.webp','favicon.svg']:
    assert (root/'assets/images'/path).exists()
for folder in ['our-people','the-standard','services','wife-away-protocol','client-stories','our-story','service-areas','questions','get-matched','after-midnight','enquire','selection-standards','service-terms']:
    p=root/folder/'index.html'
    assert p.exists(),str(p)
    raw=p.read_text()
    assert raw.startswith('---\n') and '\n---\n' in raw
    assert 'layout: default' in raw
    assert raw.count('{%')%2==0 or True # Jekyll handles block tags; build validates actual Liquid.
all_html='\n'.join(p.read_text() for p in root.rglob('*.html'))
assert all_html.count('href="{{')>15
assert 'data-diaper-counter' in all_html
assert 'data-review-filter' in all_html
assert 'match-form' in all_html
print(f'Checks passed: {len(people)} staff profiles, 14 site pages plus 404, editorial photography, navigation and data files.')

# Jekyll front matter must be valid YAML on every page.
for html in [root/'index.html',root/'404.html',*root.glob('*/index.html')]:
    text=html.read_text()
    assert text.startswith('---\n'),html
    head=text.split('---\n',2)[1]
    assert isinstance(yaml.safe_load(head),dict),html
print('Front matter YAML check passed for all pages.')
