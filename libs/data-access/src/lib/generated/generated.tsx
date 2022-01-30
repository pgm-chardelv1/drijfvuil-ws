import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type City = {
  __typename?: 'City';
  /** Cleanups that took place in this city */
  cleanups?: Maybe<Array<Cleanup>>;
  /** Postal code */
  id: Scalars['Int'];
  /** City name */
  name: Scalars['String'];
  /** Polygon of latitude longitude expressions */
  polygon: Scalars['String'];
  /** Quarters in this city */
  quarters?: Maybe<Array<Quarter>>;
  /** Reports in this city */
  reports?: Maybe<Array<Report>>;
};

export type Cleanup = {
  __typename?: 'Cleanup';
  /** City where cleanup took place */
  city: City;
  /** City ID where cleanup took place */
  cityId: Scalars['Int'];
  /** Cleanup created at [DATE] */
  createdAt: Scalars['DateTime'];
  /** Cleanup ID */
  id: Scalars['Int'];
  /** Cleanup location */
  location: Array<Scalars['Float']>;
  /** Quarter where cleanup took place */
  quarter?: Maybe<Quarter>;
  /** Quarter ID where cleanup took place */
  quarterId?: Maybe<Scalars['Int']>;
  /** Report ID */
  reportId: Scalars['Int'];
  /** Cleanup type? Partial? Full? */
  type: Scalars['String'];
};

export type CreateCityDto = {
  /** Postal code */
  id: Scalars['Int'];
  /** City name */
  name: Scalars['String'];
  /** City limits as polygon json string */
  polygon: Scalars['String'];
};

export type CreateCleanupDto = {
  /** City ID where cleanup took place */
  cityId: Scalars['Int'];
  /** Latitude and longitude of the cleanup. */
  location: Array<Scalars['Float']>;
  /** Cleanup in this quarter */
  quarterId?: InputMaybe<Scalars['Int']>;
  /** Cleanup for report with ID */
  reportId: Scalars['Int'];
  /** Cleanup type? "partial" or "full" */
  type: Scalars['String'];
};

export type CreateImageDto = {
  /** File name of the image */
  key: Scalars['String'];
  /** URL where the image is located */
  url?: InputMaybe<Scalars['String']>;
};

export type CreateQuarterDto = {
  /** ID of the quarter */
  id: Scalars['Int'];
  /** Polygon of the quarter */
  polygon: Array<Scalars['Float']>;
  /** Name of the quarter */
  quarter: Scalars['String'];
};

export type CreateReportDto = {
  /** The postal code for the city the report is made in */
  cityId: Scalars['Int'];
  /** Images for this report */
  dbImageId?: InputMaybe<Scalars['String']>;
  /** Extra information */
  extra?: InputMaybe<Scalars['String']>;
  /** Latitude and longitude of the report. Example: [51.156416,16.615456] */
  latLngTuple: Array<Scalars['Float']>;
  /** Type of litter the report is for */
  litterType?: InputMaybe<Scalars['String']>;
  /** Is this report for litter found in the water or on land? */
  locationType?: InputMaybe<Scalars['String']>;
  /** The ID for the quarter the report is made in */
  quarterId: Scalars['Int'];
};

export type CreateUserDto = {
  /** User email address. Has to be a valid email. Can't be empty. */
  email: Scalars['String'];
  /** User password. Has to be minimum 8 characters, maximum 42 characters. Can't be empty. */
  password: Scalars['String'];
};

export type DbImage = {
  __typename?: 'DbImage';
  /** Image was created at */
  createdAt: Scalars['DateTime'];
  /** Image ID */
  id: Scalars['String'];
  /** Image Key */
  key: Scalars['String'];
  /** The report the image is linked to */
  report?: Maybe<Report>;
  /** Image last updated at */
  updatedAt: Scalars['DateTime'];
  /** Image URL */
  url?: Maybe<Scalars['String']>;
};

export type LoginUserDto = {
  /** User email */
  email: Scalars['String'];
  /** User password */
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCity: City;
  createCleanup: Cleanup;
  createImage: DbImage;
  createQuarter: Quarter;
  createReport: Report;
  createUser: User;
  deleteCity: City;
  deleteCleanup: Cleanup;
  deleteImage: DbImage;
  deleteManyReports: Report;
  deleteQuarter: Quarter;
  deleteReport: Report;
  deleteUser: User;
  getPresignedImageUrl: DbImage;
  handleFullCleanup: Report;
  login: User;
  register: User;
  updateCity: City;
  updateCleanup: Cleanup;
  updateImage: DbImage;
  updateQuarter: Quarter;
  updateReport: Report;
  updateUser: User;
};


export type MutationCreateCityArgs = {
  createCityInput: CreateCityDto;
};


export type MutationCreateCleanupArgs = {
  createCleanupInput: CreateCleanupDto;
};


export type MutationCreateImageArgs = {
  createImageInput: CreateImageDto;
};


export type MutationCreateQuarterArgs = {
  createQuarterInput: CreateQuarterDto;
};


export type MutationCreateReportArgs = {
  createReportInput: CreateReportDto;
};


export type MutationCreateUserArgs = {
  createUserDto: CreateUserDto;
};


export type MutationDeleteCityArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteCleanupArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteImageArgs = {
  id: Scalars['String'];
};


export type MutationDeleteManyReportsArgs = {
  ids: Array<Scalars['Int']>;
};


export type MutationDeleteQuarterArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteReportArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationGetPresignedImageUrlArgs = {
  updateImageInput: UpdateImageDto;
};


export type MutationHandleFullCleanupArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  user: LoginUserDto;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateCityArgs = {
  updateCityInput: UpdateCityDto;
};


export type MutationUpdateCleanupArgs = {
  updateCleanupInput: UpdateCleanupDto;
};


export type MutationUpdateImageArgs = {
  updateImageInput: UpdateImageDto;
};


export type MutationUpdateQuarterArgs = {
  updateQuarterInput: UpdateQuarterDto;
};


export type MutationUpdateReportArgs = {
  updateReportInput: UpdateReportDto;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserDto;
};

export type Quarter = {
  __typename?: 'Quarter';
  /** The city this quarter is in */
  city: City;
  /** City Postal code */
  cityId: Scalars['Int'];
  /** Cleanups that took place in this quarter */
  cleanups?: Maybe<Array<Cleanup>>;
  /** Quarter ID */
  id: Scalars['Int'];
  /** Polygon for the quarter. */
  polygon: Array<Scalars['Float']>;
  /** Quarter name */
  quarter: Scalars['String'];
  /** Reports in this quarter */
  reports?: Maybe<Array<Report>>;
};

export type Query = {
  __typename?: 'Query';
  cities: Array<City>;
  city: City;
  cleanup: Cleanup;
  cleanups: Array<Cleanup>;
  dbImage: DbImage;
  dbImages: Array<DbImage>;
  quarter: Quarter;
  quarters: Array<Quarter>;
  report: Report;
  reports: Array<Report>;
  user: User;
  users: Array<User>;
};


export type QueryCityArgs = {
  id: Scalars['Int'];
};


export type QueryCleanupArgs = {
  id: Scalars['Int'];
};


export type QueryCleanupsArgs = {
  cityId?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  quarterId?: InputMaybe<Scalars['Int']>;
};


export type QueryDbImageArgs = {
  id: Scalars['String'];
};


export type QueryQuarterArgs = {
  id: Scalars['Int'];
};


export type QueryReportArgs = {
  id: Scalars['Int'];
};


export type QueryReportsArgs = {
  cityId?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  quarterId?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id: Scalars['String'];
};

export type Report = {
  __typename?: 'Report';
  /** The city the report was made in */
  city: City;
  /** The postal code for the city the report is made in */
  cityId: Scalars['Int'];
  /** Report created at [DATE] */
  createdAt: Scalars['DateTime'];
  /** Image for this report */
  dbImage?: Maybe<DbImage>;
  /** ID for the image */
  dbImageId?: Maybe<Scalars['String']>;
  /** Extra information for the report */
  extra?: Maybe<Scalars['String']>;
  /** Report ID */
  id: Scalars['Int'];
  /** Latitude and longitude of the report as a latitude longitude tuple. Example: [51.11321,16.18646] */
  latLngTuple: Array<Scalars['Float']>;
  /** Type of litter report is for */
  litterType?: Maybe<Scalars['String']>;
  /** Is this report for litter in the water or on land? */
  locationType: Scalars['String'];
  /** The quarter the report was made in */
  quarter?: Maybe<Quarter>;
  /** ID for the quarter the report is made in */
  quarterId?: Maybe<Scalars['Int']>;
  /** Report updated at [DATE] */
  updatedAt: Scalars['DateTime'];
};

export type UpdateCityDto = {
  /** Postal code */
  id: Scalars['Int'];
  /** City name */
  name?: InputMaybe<Scalars['String']>;
  /** City limits as polygon json string */
  polygon?: InputMaybe<Scalars['String']>;
};

export type UpdateCleanupDto = {
  /** City ID where cleanup took place */
  cityId?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  /** Latitude and longitude of the cleanup. */
  location?: InputMaybe<Array<Scalars['Float']>>;
  /** Cleanup in this quarter */
  quarterId?: InputMaybe<Scalars['Int']>;
  /** Cleanup for report with ID */
  reportId?: InputMaybe<Scalars['Int']>;
  /** Cleanup type? "partial" or "full" */
  type?: InputMaybe<Scalars['String']>;
};

export type UpdateImageDto = {
  /** ID for the image */
  id: Scalars['String'];
  /** File name of the image */
  key?: InputMaybe<Scalars['String']>;
  /** URL where the image is located */
  url?: InputMaybe<Scalars['String']>;
};

export type UpdateQuarterDto = {
  id: Scalars['Int'];
  /** Polygon of the quarter */
  polygon?: InputMaybe<Array<Scalars['Float']>>;
  /** Name of the quarter */
  quarter?: InputMaybe<Scalars['String']>;
};

export type UpdateReportDto = {
  /** The postal code for the city the report is made in */
  cityId?: InputMaybe<Scalars['Int']>;
  /** Images for this report */
  dbImageId?: InputMaybe<Scalars['String']>;
  /** Extra information */
  extra?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  /** Latitude and longitude of the report. Example: [51.156416,16.615456] */
  latLngTuple?: InputMaybe<Array<Scalars['Float']>>;
  /** Type of litter the report is for */
  litterType?: InputMaybe<Scalars['String']>;
  /** Is this report for litter found in the water or on land? */
  locationType?: InputMaybe<Scalars['String']>;
  /** The ID for the quarter the report is made in */
  quarterId?: InputMaybe<Scalars['Int']>;
};

export type UpdateUserDto = {
  /** User email address. Has to be a valid email. Can't be empty. */
  email?: InputMaybe<Scalars['String']>;
  /** ID for the user. Has to be a valid UUID. */
  id: Scalars['String'];
  /** User password. Has to be minimum 8 characters, maximum 42 characters. Can't be empty. */
  password?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  /** User email */
  email: Scalars['String'];
  /** User ID */
  id: Scalars['String'];
  /** User password */
  password: Scalars['String'];
};

export type ReportListQueryVariables = Exact<{
  cityId?: InputMaybe<Scalars['Int']>;
  quarterId?: InputMaybe<Scalars['Int']>;
}>;


export type ReportListQuery = { __typename?: 'Query', reports: Array<{ __typename?: 'Report', id: number, locationType: string, litterType?: string | null | undefined, latLngTuple: Array<number>, dbImageId?: string | null | undefined, extra?: string | null | undefined, dbImage?: { __typename?: 'DbImage', id: string, key: string } | null | undefined, quarter?: { __typename?: 'Quarter', id: number, quarter: string } | null | undefined, city: { __typename?: 'City', id: number, name: string } }> };

export type ReportQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReportQuery = { __typename?: 'Query', report: { __typename?: 'Report', id: number, locationType: string, litterType?: string | null | undefined, latLngTuple: Array<number>, dbImageId?: string | null | undefined, extra?: string | null | undefined, dbImage?: { __typename?: 'DbImage', id: string, key: string } | null | undefined, quarter?: { __typename?: 'Quarter', id: number, quarter: string } | null | undefined, city: { __typename?: 'City', id: number, name: string } } };

export type CreateReportMutationVariables = Exact<{
  createReportInput: CreateReportDto;
}>;


export type CreateReportMutation = { __typename?: 'Mutation', createReport: { __typename?: 'Report', id: number, createdAt: any } };

export type CreateImageMutationVariables = Exact<{
  createImageInput: CreateImageDto;
}>;


export type CreateImageMutation = { __typename?: 'Mutation', createImage: { __typename?: 'DbImage', id: string, key: string } };

export type UpdateReportMutationVariables = Exact<{
  updateReportInput: UpdateReportDto;
}>;


export type UpdateReportMutation = { __typename?: 'Mutation', updateReport: { __typename?: 'Report', id: number, updatedAt: any } };

export type HandleFullCleanupMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type HandleFullCleanupMutation = { __typename?: 'Mutation', handleFullCleanup: { __typename?: 'Report', id: number, latLngTuple: Array<number> } };

export type DbImageListQueryVariables = Exact<{ [key: string]: never; }>;


export type DbImageListQuery = { __typename?: 'Query', dbImages: Array<{ __typename?: 'DbImage', id: string, key: string }> };

export type ImageQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ImageQuery = { __typename?: 'Query', dbImage: { __typename?: 'DbImage', id: string, key: string } };

export type GetPresignedImageUrlMutationVariables = Exact<{
  updateImageInput: UpdateImageDto;
}>;


export type GetPresignedImageUrlMutation = { __typename?: 'Mutation', getPresignedImageUrl: { __typename?: 'DbImage', key: string, url?: string | null | undefined } };

export type QuarterListQueryVariables = Exact<{ [key: string]: never; }>;


export type QuarterListQuery = { __typename?: 'Query', quarters: Array<{ __typename?: 'Quarter', id: number, quarter: string, polygon: Array<number> }> };

export type QuarterQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type QuarterQuery = { __typename?: 'Query', quarter: { __typename?: 'Quarter', id: number, quarter: string, polygon: Array<number> } };

export type CityListQueryVariables = Exact<{ [key: string]: never; }>;


export type CityListQuery = { __typename?: 'Query', cities: Array<{ __typename?: 'City', id: number, name: string, polygon: string }> };

export type CityQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CityQuery = { __typename?: 'Query', city: { __typename?: 'City', id: number, name: string, polygon: string } };

export type CleanupListQueryVariables = Exact<{
  cityId?: InputMaybe<Scalars['Int']>;
  quarterId?: InputMaybe<Scalars['Int']>;
}>;


export type CleanupListQuery = { __typename?: 'Query', cleanups: Array<{ __typename?: 'Cleanup', id: number, location: Array<number>, quarter?: { __typename?: 'Quarter', quarter: string, id: number } | null | undefined, city: { __typename?: 'City', name: string } }> };

export type CleanupQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type CleanupQuery = { __typename?: 'Query', cleanup: { __typename?: 'Cleanup', id: number, location: Array<number>, quarter?: { __typename?: 'Quarter', quarter: string, id: number } | null | undefined, city: { __typename?: 'City', name: string } } };


export const ReportListDocument = gql`
    query reportList($cityId: Int, $quarterId: Int) {
  reports(cityId: $cityId, quarterId: $quarterId) {
    id
    locationType
    litterType
    latLngTuple
    dbImageId
    dbImage {
      id
      key
    }
    extra
    quarter {
      id
      quarter
    }
    city {
      id
      name
    }
  }
}
    `;

/**
 * __useReportListQuery__
 *
 * To run a query within a React component, call `useReportListQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportListQuery({
 *   variables: {
 *      cityId: // value for 'cityId'
 *      quarterId: // value for 'quarterId'
 *   },
 * });
 */
export function useReportListQuery(baseOptions?: Apollo.QueryHookOptions<ReportListQuery, ReportListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportListQuery, ReportListQueryVariables>(ReportListDocument, options);
      }
export function useReportListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportListQuery, ReportListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportListQuery, ReportListQueryVariables>(ReportListDocument, options);
        }
export type ReportListQueryHookResult = ReturnType<typeof useReportListQuery>;
export type ReportListLazyQueryHookResult = ReturnType<typeof useReportListLazyQuery>;
export type ReportListQueryResult = Apollo.QueryResult<ReportListQuery, ReportListQueryVariables>;
export const ReportDocument = gql`
    query report($id: Int!) {
  report(id: $id) {
    id
    locationType
    litterType
    latLngTuple
    dbImageId
    dbImage {
      id
      key
    }
    extra
    quarter {
      id
      quarter
    }
    city {
      id
      name
    }
  }
}
    `;

/**
 * __useReportQuery__
 *
 * To run a query within a React component, call `useReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useReportQuery(baseOptions: Apollo.QueryHookOptions<ReportQuery, ReportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReportQuery, ReportQueryVariables>(ReportDocument, options);
      }
export function useReportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReportQuery, ReportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReportQuery, ReportQueryVariables>(ReportDocument, options);
        }
export type ReportQueryHookResult = ReturnType<typeof useReportQuery>;
export type ReportLazyQueryHookResult = ReturnType<typeof useReportLazyQuery>;
export type ReportQueryResult = Apollo.QueryResult<ReportQuery, ReportQueryVariables>;
export const CreateReportDocument = gql`
    mutation createReport($createReportInput: CreateReportDto!) {
  createReport(createReportInput: $createReportInput) {
    id
    createdAt
  }
}
    `;
export type CreateReportMutationFn = Apollo.MutationFunction<CreateReportMutation, CreateReportMutationVariables>;

/**
 * __useCreateReportMutation__
 *
 * To run a mutation, you first call `useCreateReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReportMutation, { data, loading, error }] = useCreateReportMutation({
 *   variables: {
 *      createReportInput: // value for 'createReportInput'
 *   },
 * });
 */
export function useCreateReportMutation(baseOptions?: Apollo.MutationHookOptions<CreateReportMutation, CreateReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReportMutation, CreateReportMutationVariables>(CreateReportDocument, options);
      }
export type CreateReportMutationHookResult = ReturnType<typeof useCreateReportMutation>;
export type CreateReportMutationResult = Apollo.MutationResult<CreateReportMutation>;
export type CreateReportMutationOptions = Apollo.BaseMutationOptions<CreateReportMutation, CreateReportMutationVariables>;
export const CreateImageDocument = gql`
    mutation createImage($createImageInput: CreateImageDto!) {
  createImage(createImageInput: $createImageInput) {
    id
    key
  }
}
    `;
export type CreateImageMutationFn = Apollo.MutationFunction<CreateImageMutation, CreateImageMutationVariables>;

/**
 * __useCreateImageMutation__
 *
 * To run a mutation, you first call `useCreateImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createImageMutation, { data, loading, error }] = useCreateImageMutation({
 *   variables: {
 *      createImageInput: // value for 'createImageInput'
 *   },
 * });
 */
export function useCreateImageMutation(baseOptions?: Apollo.MutationHookOptions<CreateImageMutation, CreateImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateImageMutation, CreateImageMutationVariables>(CreateImageDocument, options);
      }
export type CreateImageMutationHookResult = ReturnType<typeof useCreateImageMutation>;
export type CreateImageMutationResult = Apollo.MutationResult<CreateImageMutation>;
export type CreateImageMutationOptions = Apollo.BaseMutationOptions<CreateImageMutation, CreateImageMutationVariables>;
export const UpdateReportDocument = gql`
    mutation updateReport($updateReportInput: UpdateReportDto!) {
  updateReport(updateReportInput: $updateReportInput) {
    id
    updatedAt
  }
}
    `;
export type UpdateReportMutationFn = Apollo.MutationFunction<UpdateReportMutation, UpdateReportMutationVariables>;

/**
 * __useUpdateReportMutation__
 *
 * To run a mutation, you first call `useUpdateReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReportMutation, { data, loading, error }] = useUpdateReportMutation({
 *   variables: {
 *      updateReportInput: // value for 'updateReportInput'
 *   },
 * });
 */
export function useUpdateReportMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReportMutation, UpdateReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReportMutation, UpdateReportMutationVariables>(UpdateReportDocument, options);
      }
export type UpdateReportMutationHookResult = ReturnType<typeof useUpdateReportMutation>;
export type UpdateReportMutationResult = Apollo.MutationResult<UpdateReportMutation>;
export type UpdateReportMutationOptions = Apollo.BaseMutationOptions<UpdateReportMutation, UpdateReportMutationVariables>;
export const HandleFullCleanupDocument = gql`
    mutation handleFullCleanup($id: Int!) {
  handleFullCleanup(id: $id) {
    id
    latLngTuple
  }
}
    `;
export type HandleFullCleanupMutationFn = Apollo.MutationFunction<HandleFullCleanupMutation, HandleFullCleanupMutationVariables>;

/**
 * __useHandleFullCleanupMutation__
 *
 * To run a mutation, you first call `useHandleFullCleanupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleFullCleanupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleFullCleanupMutation, { data, loading, error }] = useHandleFullCleanupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHandleFullCleanupMutation(baseOptions?: Apollo.MutationHookOptions<HandleFullCleanupMutation, HandleFullCleanupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleFullCleanupMutation, HandleFullCleanupMutationVariables>(HandleFullCleanupDocument, options);
      }
export type HandleFullCleanupMutationHookResult = ReturnType<typeof useHandleFullCleanupMutation>;
export type HandleFullCleanupMutationResult = Apollo.MutationResult<HandleFullCleanupMutation>;
export type HandleFullCleanupMutationOptions = Apollo.BaseMutationOptions<HandleFullCleanupMutation, HandleFullCleanupMutationVariables>;
export const DbImageListDocument = gql`
    query dbImageList {
  dbImages {
    id
    key
  }
}
    `;

/**
 * __useDbImageListQuery__
 *
 * To run a query within a React component, call `useDbImageListQuery` and pass it any options that fit your needs.
 * When your component renders, `useDbImageListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDbImageListQuery({
 *   variables: {
 *   },
 * });
 */
export function useDbImageListQuery(baseOptions?: Apollo.QueryHookOptions<DbImageListQuery, DbImageListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DbImageListQuery, DbImageListQueryVariables>(DbImageListDocument, options);
      }
export function useDbImageListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DbImageListQuery, DbImageListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DbImageListQuery, DbImageListQueryVariables>(DbImageListDocument, options);
        }
export type DbImageListQueryHookResult = ReturnType<typeof useDbImageListQuery>;
export type DbImageListLazyQueryHookResult = ReturnType<typeof useDbImageListLazyQuery>;
export type DbImageListQueryResult = Apollo.QueryResult<DbImageListQuery, DbImageListQueryVariables>;
export const ImageDocument = gql`
    query image($id: String!) {
  dbImage(id: $id) {
    id
    key
  }
}
    `;

/**
 * __useImageQuery__
 *
 * To run a query within a React component, call `useImageQuery` and pass it any options that fit your needs.
 * When your component renders, `useImageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useImageQuery(baseOptions: Apollo.QueryHookOptions<ImageQuery, ImageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImageQuery, ImageQueryVariables>(ImageDocument, options);
      }
export function useImageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImageQuery, ImageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImageQuery, ImageQueryVariables>(ImageDocument, options);
        }
export type ImageQueryHookResult = ReturnType<typeof useImageQuery>;
export type ImageLazyQueryHookResult = ReturnType<typeof useImageLazyQuery>;
export type ImageQueryResult = Apollo.QueryResult<ImageQuery, ImageQueryVariables>;
export const GetPresignedImageUrlDocument = gql`
    mutation getPresignedImageUrl($updateImageInput: UpdateImageDto!) {
  getPresignedImageUrl(updateImageInput: $updateImageInput) {
    key
    url
  }
}
    `;
export type GetPresignedImageUrlMutationFn = Apollo.MutationFunction<GetPresignedImageUrlMutation, GetPresignedImageUrlMutationVariables>;

/**
 * __useGetPresignedImageUrlMutation__
 *
 * To run a mutation, you first call `useGetPresignedImageUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetPresignedImageUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getPresignedImageUrlMutation, { data, loading, error }] = useGetPresignedImageUrlMutation({
 *   variables: {
 *      updateImageInput: // value for 'updateImageInput'
 *   },
 * });
 */
export function useGetPresignedImageUrlMutation(baseOptions?: Apollo.MutationHookOptions<GetPresignedImageUrlMutation, GetPresignedImageUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetPresignedImageUrlMutation, GetPresignedImageUrlMutationVariables>(GetPresignedImageUrlDocument, options);
      }
export type GetPresignedImageUrlMutationHookResult = ReturnType<typeof useGetPresignedImageUrlMutation>;
export type GetPresignedImageUrlMutationResult = Apollo.MutationResult<GetPresignedImageUrlMutation>;
export type GetPresignedImageUrlMutationOptions = Apollo.BaseMutationOptions<GetPresignedImageUrlMutation, GetPresignedImageUrlMutationVariables>;
export const QuarterListDocument = gql`
    query quarterList {
  quarters {
    id
    quarter
    polygon
  }
}
    `;

/**
 * __useQuarterListQuery__
 *
 * To run a query within a React component, call `useQuarterListQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuarterListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuarterListQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuarterListQuery(baseOptions?: Apollo.QueryHookOptions<QuarterListQuery, QuarterListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuarterListQuery, QuarterListQueryVariables>(QuarterListDocument, options);
      }
export function useQuarterListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuarterListQuery, QuarterListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuarterListQuery, QuarterListQueryVariables>(QuarterListDocument, options);
        }
export type QuarterListQueryHookResult = ReturnType<typeof useQuarterListQuery>;
export type QuarterListLazyQueryHookResult = ReturnType<typeof useQuarterListLazyQuery>;
export type QuarterListQueryResult = Apollo.QueryResult<QuarterListQuery, QuarterListQueryVariables>;
export const QuarterDocument = gql`
    query quarter($id: Int!) {
  quarter(id: $id) {
    id
    quarter
    polygon
  }
}
    `;

/**
 * __useQuarterQuery__
 *
 * To run a query within a React component, call `useQuarterQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuarterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuarterQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQuarterQuery(baseOptions: Apollo.QueryHookOptions<QuarterQuery, QuarterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuarterQuery, QuarterQueryVariables>(QuarterDocument, options);
      }
export function useQuarterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuarterQuery, QuarterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuarterQuery, QuarterQueryVariables>(QuarterDocument, options);
        }
export type QuarterQueryHookResult = ReturnType<typeof useQuarterQuery>;
export type QuarterLazyQueryHookResult = ReturnType<typeof useQuarterLazyQuery>;
export type QuarterQueryResult = Apollo.QueryResult<QuarterQuery, QuarterQueryVariables>;
export const CityListDocument = gql`
    query cityList {
  cities {
    id
    name
    polygon
  }
}
    `;

/**
 * __useCityListQuery__
 *
 * To run a query within a React component, call `useCityListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCityListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCityListQuery({
 *   variables: {
 *   },
 * });
 */
export function useCityListQuery(baseOptions?: Apollo.QueryHookOptions<CityListQuery, CityListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CityListQuery, CityListQueryVariables>(CityListDocument, options);
      }
export function useCityListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CityListQuery, CityListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CityListQuery, CityListQueryVariables>(CityListDocument, options);
        }
export type CityListQueryHookResult = ReturnType<typeof useCityListQuery>;
export type CityListLazyQueryHookResult = ReturnType<typeof useCityListLazyQuery>;
export type CityListQueryResult = Apollo.QueryResult<CityListQuery, CityListQueryVariables>;
export const CityDocument = gql`
    query city($id: Int!) {
  city(id: $id) {
    id
    name
    polygon
  }
}
    `;

/**
 * __useCityQuery__
 *
 * To run a query within a React component, call `useCityQuery` and pass it any options that fit your needs.
 * When your component renders, `useCityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCityQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCityQuery(baseOptions: Apollo.QueryHookOptions<CityQuery, CityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CityQuery, CityQueryVariables>(CityDocument, options);
      }
export function useCityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CityQuery, CityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CityQuery, CityQueryVariables>(CityDocument, options);
        }
export type CityQueryHookResult = ReturnType<typeof useCityQuery>;
export type CityLazyQueryHookResult = ReturnType<typeof useCityLazyQuery>;
export type CityQueryResult = Apollo.QueryResult<CityQuery, CityQueryVariables>;
export const CleanupListDocument = gql`
    query cleanupList($cityId: Int, $quarterId: Int) {
  cleanups(cityId: $cityId, quarterId: $quarterId) {
    id
    quarter {
      quarter
      id
    }
    city {
      name
    }
    location
  }
}
    `;

/**
 * __useCleanupListQuery__
 *
 * To run a query within a React component, call `useCleanupListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCleanupListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCleanupListQuery({
 *   variables: {
 *      cityId: // value for 'cityId'
 *      quarterId: // value for 'quarterId'
 *   },
 * });
 */
export function useCleanupListQuery(baseOptions?: Apollo.QueryHookOptions<CleanupListQuery, CleanupListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CleanupListQuery, CleanupListQueryVariables>(CleanupListDocument, options);
      }
export function useCleanupListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CleanupListQuery, CleanupListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CleanupListQuery, CleanupListQueryVariables>(CleanupListDocument, options);
        }
export type CleanupListQueryHookResult = ReturnType<typeof useCleanupListQuery>;
export type CleanupListLazyQueryHookResult = ReturnType<typeof useCleanupListLazyQuery>;
export type CleanupListQueryResult = Apollo.QueryResult<CleanupListQuery, CleanupListQueryVariables>;
export const CleanupDocument = gql`
    query cleanup($id: Int!) {
  cleanup(id: $id) {
    id
    quarter {
      quarter
      id
    }
    city {
      name
    }
    location
  }
}
    `;

/**
 * __useCleanupQuery__
 *
 * To run a query within a React component, call `useCleanupQuery` and pass it any options that fit your needs.
 * When your component renders, `useCleanupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCleanupQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCleanupQuery(baseOptions: Apollo.QueryHookOptions<CleanupQuery, CleanupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CleanupQuery, CleanupQueryVariables>(CleanupDocument, options);
      }
export function useCleanupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CleanupQuery, CleanupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CleanupQuery, CleanupQueryVariables>(CleanupDocument, options);
        }
export type CleanupQueryHookResult = ReturnType<typeof useCleanupQuery>;
export type CleanupLazyQueryHookResult = ReturnType<typeof useCleanupLazyQuery>;
export type CleanupQueryResult = Apollo.QueryResult<CleanupQuery, CleanupQueryVariables>;