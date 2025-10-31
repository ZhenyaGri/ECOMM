import { useState } from 'react';
import { getPublishedProducts } from '../../api/productsService';
import { ProductProjectionPagedQueryResponse } from '../../api/productsType';
import { Button } from '../button/button';
import { SortingSelect, SortOption } from '../select/Select';
import { Wrapper } from '../wrapper/wrapper';
import {
  CatalogToolbarProps,
  CategoryID,
  categoryMap,
  colors,
  facets,
} from './constants';

export const CatalogToolbar = ({
  pageSize,
  onProductsSorted,
  onFacetFilter,
}: CatalogToolbarProps): React.ReactNode => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFacetClick = (facetType: string, value: string): void => {
    const updatedFilters = activeFilters.includes(`${facetType}:${value}`)
      ? activeFilters.filter((f) => f !== `${facetType}:${value}`)
      : [...activeFilters, `${facetType}:${value}`];

    setActiveFilters(updatedFilters);

    const facetGroups: Record<string, string[]> = {};

    updatedFilters.forEach((filter) => {
      const [type, val] = filter.split(':');
      if (!facetGroups[type]) {
        facetGroups[type] = [];
      }
      facetGroups[type].push(val);
    });

    const apiFilters = Object.entries(facetGroups).map(([type, values]) => {
      return `variants.attributes.${type}:"${values.join('","')}"`;
    });

    onFacetFilter(apiFilters);
  };

  const handleSortChange = async (sortOption: SortOption): Promise<void> => {
    const response: ProductProjectionPagedQueryResponse =
      await getPublishedProducts(
        {
          limit: pageSize,
          sort: [sortOption === 'featured' ? 'createdAt asc' : sortOption],
        },
        sortOption === 'price asc' || sortOption === 'price desc'
      );
    onProductsSorted(response);
    console.log(response);
  };

  const handleCategoryClick = (categoryId: string): void => {
    const categoryFilter = `categories.id: subtree("${categoryId}")`;
    onFacetFilter([categoryFilter]);
  };

  const toggleFormFacet = (facet: string): void => {
    const facetForm = document.querySelector(`.facet-${facet}`);
    facetForm?.classList.toggle('hidden');
    facets.forEach((elem) => {
      if (elem !== facet) {
        document.querySelector(`.facet-${elem}`)?.classList.add('hidden');
      }
    });
  };

  return (
    <Wrapper className="facets-container">
      <form id="FacetFiltersForm">
        <Wrapper className="facets-form">
          <Button
            className="btn-form-facets"
            type="button"
            children="Filter:"
            onClick={() => {
              const facetSelector = document.querySelector('.facet-selector');
              facetSelector?.classList.toggle('hidden');
            }}
          ></Button>
          <Wrapper className="facet-selector hidden">
            <Wrapper className="facet__item">
              <Button
                className="btn-facet-selector"
                type="button"
                children="Category"
                onClick={() => toggleFormFacet('category')}
              ></Button>
              <Wrapper className="facet-category hidden">
                {Object.keys(categoryMap).map((categoryName, i) => {
                  const categoryId =
                    categoryMap[categoryName as keyof CategoryID];
                  return (
                    <Button
                      key={i}
                      type="button"
                      onClick={() => handleCategoryClick(categoryId)}
                    >
                      {categoryName}
                    </Button>
                  );
                })}
              </Wrapper>
            </Wrapper>
            <Wrapper className="facet__item">
              <Button
                className="btn-facet-selector"
                type="button"
                children="Colour"
                onClick={() => toggleFormFacet('color')}
              ></Button>
              <Wrapper className="facet-color hidden">
                {colors.map((color, i) => (
                  <Button
                    key={i}
                    type="button"
                    children={color}
                    onClick={() => handleFacetClick('color', color)}
                    className={
                      activeFilters.includes(
                        `variants.attributes.color:"${color}"`
                      )
                        ? 'active'
                        : ''
                    }
                  ></Button>
                ))}
              </Wrapper>
            </Wrapper>
            <Wrapper className="facet__item">
              <Button
                className="btn-facet-selector"
                type="button"
                children="New"
                onClick={() => toggleFormFacet('new')}
              ></Button>
              <Wrapper className="facet-new hidden">
                <Button
                  type="button"
                  children="yes"
                  onClick={() => handleFacetClick('new', 'true')}
                ></Button>
                <Button
                  type="button"
                  children="no"
                  onClick={() => handleFacetClick('new', 'false')}
                ></Button>
              </Wrapper>
            </Wrapper>
          </Wrapper>
        </Wrapper>
        <SortingSelect onChange={handleSortChange} />
      </form>
    </Wrapper>
  );
};
