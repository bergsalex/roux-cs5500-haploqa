# Angular Library: `ngx-genome-karyotype-plots`

## Usage

### Setup

#### Install Module
```
npm install @haploqa-modules/ngx-genome-karyotype-plots
```

#### Import Module
```typescript
import {NgxGenomeKaryotypePlotsModule} from "@haploqa-modules/ngx-genome-karyotype-plots";

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Base modules
    NgxGenomeKaryotypePlotsModule,
    // Other modules
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
```

### Module

There are four main components to this module:

- `PlotContainerComponent` with selector `<ngx-genome-plot-container>`
- `GenomeKaryotypePlotComponent` with selector `<ngx-genome-karyotype-plot>`
- `GenomeIntervalPlotComponent` with selector `<ngx-genome-interval-plot>`
- `HaplotypesPanelComponent` with selector `<ngx-genome-haplotype-panel>`

The `PlotContainerComponent` is used to encapsulate plots with the same data source, and with 
connections between click and mouse events. It has two required data inputs:
 - `chrSizes` - an array of chromosome objects that specify the chromosome, chromosome size, and chromosome start position.
 - `strainMap` - an object with strain ids as the key, and an object with strain color and link url as values.
```angular2html
<ngx-genome-plot-container [chrSizes]="chrSizes" [strainMap]="strainMap">

  <!-- We'll specify specific plots here --> 

</ngx-genome-plot-container>
```

The `GenomeKaryotypePlotComponent` is the main plot of this module. It displays the contributing 
haplotypes for each chromosome of the selected sample strain. It has two required data inputs:
- `sample` - an object describing the metadata about the current sample
- `haploData` - an object with two child objects:
  - `contributing_strains` - a list of strains that contributed to the sample's haplotypes, and 
  - `viterbi_haplotypes` - an object with overall concordance metadata, as well as concordance and haplotype information by chromosome

```angular2html
<ngx-genome-plot-container [chrSizes]="chrSizes" [strainMap]="strainMap">
  <ngx-genome-karyotype-plot [sample]="sample" [haploData]="haploData"></ngx-genome-karyotype-plot>
</ngx-genome-plot-container>
```

The `GenomeIntervalPlotComponent` provides a detail view of the selected chromosome region. It 
takes the same data inputs as the `GenomeKaryotypePlotComponent`, but also requires data for input:
- `snpData` - an object with SNP ids as keys, and objects of SNP information as values

```angular2html
<ngx-genome-plot-container [chrSizes]="chrSizes" [strainMap]="strainMap">
  <ngx-genome-interval-plot [sample]="sample" 
                            [haploData]="haploData" 
                            [snpData]="snpData"></ngx-genome-interval-plot>
</ngx-genome-plot-container>
```

Place and karyotype and interval plot in the same plot container to connect them:
```angular2html
<ngx-genome-plot-container [chrSizes]="chrSizes" 
                           [strainMap]="strainMap">
  <!-- Karyotpye Plot -->
  <ngx-genome-karyotype-plot [sample]="sample" 
                             [haploData]="haploData"></ngx-genome-karyotype-plot>
  <!-- Interval Plot -->
  <ngx-genome-interval-plot [sample]="sample" 
                            [haploData]="haploData" 
                            [snpData]="snpData"></ngx-genome-interval-plot>
</ngx-genome-plot-container>
```

You can also add a comparison interval plot:
```angular2html
<ngx-genome-plot-container [chrSizes]="chrSizes" 
                           [strainMap]="strainMap">
  <!-- Karyotpye Plot -->
  <ngx-genome-karyotype-plot [sample]="sample" 
                             [haploData]="haploData"></ngx-genome-karyotype-plot>
  <!-- Interval Plot -->
  <ngx-genome-interval-plot [sample]="sample" 
                            [haploData]="haploData"
                            [snpData]="snpData"></ngx-genome-interval-plot>
  <ngx-genome-interval-plot [sample]="comparison_sample" 
                            [haploData]="haploData"
                            [snpData]="comparison_snpData"></ngx-genome-interval-plot>
</ngx-genome-plot-container>
```

The `HaplotypesPanelComponent` provides a listing of the contributing strains for the sample that when
hovered over, highlights the haplotypes contributed by that strain. The panel takes the same `sample`
object input as the `GenomeKaryotypePlotComponent` and `GenomeIntervalPlotComponent`.

Use the `slot=` attribute to place the panel at either the `header` or `footer` of the plot.

```angular2html
<ngx-genome-plot-container [chrSizes]="chrSizes" [strainMap]="strainMap">
  <ngx-genome-karyotype-plot [sample]="sample" [haploData]="haploData">
    <ngx-genome-haplotype-panel [sample]="sample" slot="header"></ngx-genome-haplotype-panel>
    <!-- Note: You can also place two of the `HaplotypesPanelComponent`, -->
    <!--       one at the header and one at the footer -->
    <!--<ngx-genome-haplotype-panel [sample]="sample" slot="footer"></ngx-genome-haplotype-panel>-->
  </ngx-genome-karyotype-plot>
</ngx-genome-plot-container>
```

To add header content, insert an html element with attribute `slot="header"` inside the 
`<ngx-genome-haplotype-panel>` element.

```angular2html
<ngx-genome-plot-container [chrSizes]="chrSizes" [strainMap]="strainMap">
  <ngx-genome-karyotype-plot [sample]="sample" [haploData]="haploData">
    <ngx-genome-haplotype-panel [sample]="sample" slot="header">
      <div slot="header">
        <h4><strong>Contributing Haplotype Strains:</strong></h4>
      </div>
    </ngx-genome-haplotype-panel>
  </ngx-genome-karyotype-plot>
</ngx-genome-plot-container>
```

A full example might look like:
```angular2html
<ngx-genome-plot-container
  [chrSizes]="chrSizes"
  [strainMap]="strainMap">
  <ngx-genome-karyotype-plot
    [sample]="sample"
    [haploData]="haploData">
    <ngx-genome-haplotype-panel [sample]="sample" slot="header">
      <div slot="header"><h4><strong>Contributing Haplotype Strains:</strong></h4></div>
    </ngx-genome-haplotype-panel>
  </ngx-genome-karyotype-plot>

  <ngx-genome-interval-plot
    [sample]="sample"
    [haploData]="haploData"
    [snpData]="snpData">
    <ngx-genome-haplotype-panel [sample]="sample" slot="footer">
      <mat-icon></mat-icon>
    </ngx-genome-haplotype-panel>
  </ngx-genome-interval-plot>
</ngx-genome-plot-container>
```

### Example Data
Example data can be found by importing the following:
```typescript
// MM10 Chromosome Sizes
import {mm10ChrSizes} from '@haploqa-modules/ngx-genome-karyotype-plots';
// Example sample "ADG"
import { HAPLO_DATA_ADG, SAMPLE_ADG, STRAIN_MAP_ADG, SNP_DATA_ADG_1 } from "@haploqa-modules/ngx-genome-karyotype-plots";
// Example sample "34M"
import { HAPLO_DATA_34M, SAMPLE_34M, STRAIN_MAP_34M, SNP_DATA_34M_1 } from "@haploqa-modules/ngx-genome-karyotype-plots";
```

## Development
This library was generated with [Nx](https://nx.dev) to be used with [Angular](https://angular.io/).

The library uses the following software patterns. 
- Singletons
  - Singleton service instance will be used to share data and functionality across plot groups, which are combinations of interval and karyotype plots that use the same data.
- Dependency Injection
  - Dependency injection will be utilized to provide components with instance of singleton service.
- Observer
  - The observer patter will be used to share events between components. An example event would be clicking the kayotype plot selects a detail region in the interval plot.
- Composite
  - The composite pattern will be used to combine objects, services and functionality into higher level entities

See the [documentation folder](/docs) for more information on this project and how to contribute.
  
### Running unit tests

Run `nx test ngx-genome-karyotype-plots` to execute the unit tests.



