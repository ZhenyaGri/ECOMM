import { Button } from '../button/button';
import { SortingSelect, SortOption } from '../select/Select';
import { Wrapper } from '../wrapper/wrapper';

export const CatalogToolbar = (): React.ReactNode => {
  const handleSortChange = (sortOption: SortOption): void => {
    console.log(sortOption);
  };
  return (
    <Wrapper className="facets-container">
      <form id="FacetFiltersForm">
        <Wrapper className="facets-form">
          <Button
            className="btn-form-facets"
            type="button"
            children="Filter:"
          ></Button>
          <Wrapper className="facet-selector hidden">
            <Wrapper className="facet__item">
              <Button
                className="btn-facet-selector"
                type="button"
                children="Product type"
              ></Button>
            </Wrapper>
            <Wrapper className="facet__item">
              <Button
                className="btn-facet-selector"
                type="button"
                children="Colour"
              ></Button>
            </Wrapper>
            <Wrapper className="facet__item">
              <Button
                className="btn-facet-selector"
                type="button"
                children="New"
              ></Button>
            </Wrapper>
          </Wrapper>
          <Wrapper className="facets-active"></Wrapper>
        </Wrapper>
        <SortingSelect onChange={handleSortChange} />
      </form>
    </Wrapper>
  );
};
