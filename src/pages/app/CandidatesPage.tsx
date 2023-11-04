import { useMemo } from 'react';
import { useGetCandidatesQuery } from '../../api/queries';
import TheTopNav from '../../components/layout/TheTopNav';
import UiAvatar from '../../components/ui/UiAvatar';
import { DropDownData } from '../../components/ui/UiDropdownMenu';
import UiInput from '../../components/ui/UiInput';
import UiLoader from '../../components/ui/UiLoader';
import UiTable from '../../components/ui/UiTable';

export default function CandidatesPage() {
  const { data: candidates } = useGetCandidatesQuery();

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
        label: 'Move to next stage',
        func: moveApplicantToNextStage,
      },
      {
        label: 'Schedule Next Steps',
        func: scheduleNextSteps,
      },
      {
        label: 'Disqualify Applicant',
        func: disqualifyApplicant,
      },
    ];
  }

  const tableData = useMemo(() => {
    return (
      candidates?.map((candidate) => ({
        ...candidate,
        user: (
          <div className="flex items-center gap-2">
            <div>
              <UiAvatar />
            </div>
            <div className="w-3/5">
              <div className="text-sm font-semibold text-gray-500">
                {candidate.name}
              </div>
              <div className="line-clamp-1 truncate text-ellipsis text-xs text-gray-300">
                {candidate.email}
              </div>
            </div>
          </div>
        ),
      })) || []
    );
  }, [candidates]);

  function promoteToHr(userId?: string) {}
  function disqualifyApplicant(userId?: string) {}
  function moveApplicantToNextStage(userId?: string) {}
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
