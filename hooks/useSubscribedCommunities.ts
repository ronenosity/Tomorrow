import { map, find, compact } from "lodash";
import {useAuthContext} from "../components/contexts/auth";
import {useCommunitiesContext} from "../components/contexts/communities";

const useSubscribedCommunities = () => {
  const { user } = useAuthContext();
  const { communities } = useCommunitiesContext();
  function sort(c) {
    const exists = find(c.subscriptions, subscription => subscription === user.id);
    if (exists)
      return c;
  }
  return compact(map(communities, community => sort(community)));
};

export default useSubscribedCommunities;
