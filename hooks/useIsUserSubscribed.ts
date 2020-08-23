import {  find, isEmpty } from "lodash";
import {useAuthContext} from "../components/contexts/auth";
import {useCommunitiesContext} from "../components/contexts/communities";

const useIsUserSubscribed = (id) => {
  const { user } = useAuthContext();
  const { communities } = useCommunitiesContext();
  const community = find(communities, c => c.id === id);
  const isSubscribed = find(community.subscriptions, authUser => authUser === user.id);
  return !isEmpty(isSubscribed);


};

export default useIsUserSubscribed;
