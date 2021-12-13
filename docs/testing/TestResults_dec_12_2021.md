## Static Testing
Static testing has identified two consistent problems with the refactored code, all related to incomplete requirements
on the data being provided to the application by The Jackson Laboratory. These issues have been logged in
GitHub Issue Tracking.

Not having a full definition of the expected inputs means some variables are typed too broadly. This resulted in the 
following eslint errors:
```
Unexpected any. Specify a different type      @typescript-eslint/no-explicit-any
Don't use `{}` as a type.                     @typescript-eslint/no-explicit-any
```

There is also a naming problem with the package related to a mismatch between the package name and the html selectors.
We leave fixing this as a future issue as The Jackson Laboratory has indicated that they have not yet decided on a final
library name.
```
The selector should start with one of these prefixes: 
"haploqa-modules" (https://angular.io/guide/styleguide#style-02-07) @angular-eslint/component-selector
```

## Unit and Integration Tests
The integration and unit tests are run together. As of this writing, all tests pass when run on the `main` branch.
```
> nx run ngx-genome-karyotype-plots:test 
 PASS   ngx-genome-karyotype-plots  libs/ngx-genome-karyotype-plots/src/lib/strain-map.service.spec.ts (7.569 s)
 PASS   ngx-genome-karyotype-plots  libs/ngx-genome-karyotype-plots/src/lib/data-cache.service.spec.ts (7.63 s)
 PASS   ngx-genome-karyotype-plots  libs/ngx-genome-karyotype-plots/src/lib/chr-ids.service.spec.ts (7.533 s)
 PASS   ngx-genome-karyotype-plots  libs/ngx-genome-karyotype-plots/src/lib/haplotypes-panel/haplotypes-panel.component.spec.ts (9.61 s)
 PASS   ngx-genome-karyotype-plots  libs/ngx-genome-karyotype-plots/src/lib/zoom-interval.service.spec.ts (9.666 s)
 PASS   ngx-genome-karyotype-plots  libs/ngx-genome-karyotype-plots/src/lib/svg-element/svg-element.component.spec.ts (9.751 s)
 PASS   ngx-genome-karyotype-plots  libs/ngx-genome-karyotype-plots/src/lib/plot-container/plot-container.component.spec.ts (9.734 s)
 PASS   ngx-genome-karyotype-plots  libs/ngx-genome-karyotype-plots/src/lib/genome-karyotype-plot/genome-karyotype-plot.component.spec.ts (9.75 s)
 PASS   ngx-genome-karyotype-plots  libs/ngx-genome-karyotype-plots/src/lib/svg-tools.service.spec.ts (9.392 s)
 PASS   ngx-genome-karyotype-plots  libs/ngx-genome-karyotype-plots/src/lib/genome-interval-plot/genome-interval-plot.component.spec.ts (10.749 s)

Test Suites: 10 passed, 10 total
Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        13.812 s
Ran all test suites.

———————————————————————————————————————————————

>  NX   SUCCESS  Running target "test" succeeded
```

## Validation Tests
The team adhered to all validation testing procedures.

- Team Approval of Requirements: [GitHub Pull Request 10](https://github.com/bergsalex/roux-cs5500-haploqa/pull/10)
- Pull Requests: [GitHub Pull Request Listing](https://github.com/bergsalex/roux-cs5500-haploqa/pulls?q=is%3Apr)
- Customer Evaluation: [CustomerSatisfactionSurvey_dec_07_2021](/docs/CustomerSatisfactionSurvey_dec_07_2021.md)


## System Tests
System tests will be implemented through the development of an example application which utilizes
the component library. The application will have tests that verify that it can build itself, and
that each public library component can be created when it does.

```
> nx run haplo-qa:test 
 PASS   haplo-qa  apps/haplo-qa/src/app/app.component.spec.ts (6.183 s)
  AppComponent
    ✓ should create the app (122 ms)
    ✓ should have as title 'haplo-qa' (22 ms)
    ✓ should render title (1731 ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        6.787 s, estimated 9 s
Ran all test suites.

———————————————————————————————————————————————

>  NX   SUCCESS  Running target "test" succeeded
```
