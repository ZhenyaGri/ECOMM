import { getPublishedProducts } from '../../api/productsService';
import { ProductProjectionPagedQueryResponse } from '../../api/productsType';
import { Button } from '../button/button';
import { SortingSelect, SortOption } from '../select/Select';
import { Wrapper } from '../wrapper/wrapper';

type CatalogToolbarProps = {
  onProductsSorted: (products: ProductProjectionPagedQueryResponse) => void;
};

export const CatalogToolbar = ({
  onProductsSorted,
}: CatalogToolbarProps): React.ReactNode => {
  const handleSortChange = async (sortOption: SortOption): Promise<void> => {
    const response: ProductProjectionPagedQueryResponse =
      await getPublishedProducts(
        {
          limit: 30,
          sort: [sortOption === 'featured' ? 'createdAt asc' : sortOption],
        },
        sortOption === 'price asc' || sortOption === 'price desc'
      );
    onProductsSorted(response);
    console.log(response);
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
