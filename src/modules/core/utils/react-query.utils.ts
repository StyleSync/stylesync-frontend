type MultipleMutationsState = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
};

/**
 * Combines the state of multiple mutations into a single state object.
 *
 * @template M - Type representing the state of an individual mutation.
 * @param {M[]} mutations - Array of mutation states.
 * @returns {MultipleMutationsState} - Combined state of all mutations.
 */
export const getMultipleMutationsState = <M extends MultipleMutationsState>(
  mutations: M[]
): MultipleMutationsState => {
  return mutations.reduce<MultipleMutationsState>(
    (res, current) => {
      return {
        // set isLoading to true if at least one of the mutations is loading.
        isLoading: current.isLoading || res.isLoading,
        // set isSuccess to true if all mutations are successful.
        isSuccess: current.isSuccess && res.isSuccess,
        // set isError to true if at least one of the mutations has error.
        isError: current.isError || res.isError,
      };
    },
    {
      isLoading: false,
      isError: false,
      isSuccess: false,
    }
  );
};
