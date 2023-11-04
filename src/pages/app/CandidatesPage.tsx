import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useGetCandidatesQuery, useRecordUserQuery } from '../../api/queries';
import { CANDIDATES_QUERY_KEY } from '../../api/queryKeys';
import TheTopNav from '../../components/layout/TheTopNav';
import { DropDownData } from '../../components/ui/UiDropdownMenu';
import UiInput from '../../components/ui/UiInput';
import UiTable from '../../components/ui/UiTable';
import UserProfile from '../../components/user/UserProfile';

export default function CandidatesPage() {
  const queryClient = useQueryClient();
  const { data: candidates } = useGetCandidatesQuery();
  const { request: recordUserRequest } = useRecordUserQuery();

  const tableHeaders = [
    {
      title: 'User',
      query: 'user',
    },
    {
      title: 'Email',
      query: 'email',
    },
    {
      title: 'Role',
      query: 'role',
    },
  ];
  function options(): DropDownData[] {
    return [
      {
        label: 'Promote to HR',
        func: promoteToHr,
      },
      {
        label: 'Schedule Next Steps',
        func: scheduleNextSteps,
      },
    ];
  }

  const tableData = useMemo(() => {
    return (
      candidates?.map((candidate) => ({
        ...candidate,
        user: <UserProfile name={candidate.name} subtitle={candidate.email} />,
      })) || []
    );
  }, [candidates]);

  function promoteToHr(userId?: string) {
    if (!userId) {
      alert('candidate id must be present to carry out this operation');
      return;
    }
    const userData = candidates?.find(({ _id }) => _id === userId);

    if (!userData) {
      alert('Candidate does not exist');
      return;
    }

    recordUserRequest({ ...userData, role: 'hr' }).then(() => {
      queryClient.invalidateQueries([CANDIDATES_QUERY_KEY]);
    });
  }
  function scheduleNextSteps(userId?: string) {}

  return (
    <div>
      <TheTopNav
        pageTitle="Candidates"
        subtitle="View and sort candidates. Perform various operations that suit your needs"
      >
        <UiInput
          name="search"
          value=""
          onChange={() => {}}
          placeholder="Search candidates by name"
        />
      </TheTopNav>
      <div className="p-5">
        <UiTable headers={tableHeaders} data={tableData} options={options} />
      </div>
    </div>
  );
}
