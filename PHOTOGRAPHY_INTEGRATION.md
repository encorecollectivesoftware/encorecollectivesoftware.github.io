# Encore Editorial v3: approved portrait integration

The six staff portraits have been updated with separately generated, fictional editorial photographs. All files are 1400 x 1740 WebP for consistent 700 x 870 responsive card crops. The source PNG files remain separate from this repository; only optimized WebP assets are included.

| Specialist | Live asset |
| --- | --- |
| Kateryna M. | `assets/images/people/kateryna.webp` |
| Mila P. | `assets/images/people/mila.webp` |
| Anastasia V. | `assets/images/people/anastasia.webp` |
| Sofia K. | `assets/images/people/sofia.webp` |
| Viktoria S. | `assets/images/people/viktoria.webp` |
| Elena R. | `assets/images/people/elena.webp` |

Profiles are defined in `_data/people.yml`. The homepage displays the first three; `/our-people/` displays all six. Replace a photo in `assets/images/people/` while retaining its filename to update both pages without code changes.

All six portraits are AI-generated fictional characters; they depict no actual staff and imply no real childcare credentials. The site's parody disclosure remains in the footer.

To preview: `bundle exec jekyll serve` and open http://localhost:4000/. The separate preview PDF is a static screenshot capture of the page design and will not contain functioning controls.
