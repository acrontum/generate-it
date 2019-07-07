## Roadmap
- [x] Make the mock generators more intelligent, instead of "dumb" random text responses return "testable" content.
- [x] Ensure this package can be used for oa3 files, currently the block is on the generation of the celebrate validation layer, not a big issue to resolve but in oa3 everything is pretty much in a schema block in the request parameters which is a breaking change from oa2.
- [ ] Add docker ability to both es6 and ts templates.
- [ ] Update the Typescript templates to use Nunjucks over moustache. They are currently 100% broken awaiting the port over.
- [ ] Convert the mock generators to the typescript tpl.
- [ ] Optionally add in socket connections via vli args.
- [ ] Optionally add in mongoose via cli args.
