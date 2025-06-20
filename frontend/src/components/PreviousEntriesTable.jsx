import { BookOpen, Calendar } from "lucide-react";

const PreviousEntriesTable = ({ entries }) => {
    if (entries.length === 0) {
      return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Previous Entries</h3>
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No previous entries found</p>
            <p className="text-gray-400 text-sm">Start logging your daily progress to see your history here</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="bg-white rounded-2xl shadow-lg px-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Productivity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Feedback</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Blockers</th>
              </tr>
            </thead>
            <tbody>
              {entries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((entry, index) => (
                <tr key={entry.createdAt} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="font-medium text-gray-800">
                        {new Date(entry.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',  
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="max-w-xs">
                      <p className="text-gray-700 text-sm line-clamp-3">
                        {entry.log}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="max-w-xs">
                      <p className="text-gray-700 text-sm line-clamp-3">
                        {entry.feedback}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="max-w-xs">
                      <p className="text-gray-700 text-sm line-clamp-3">
                        {entry.blocker || 'None'}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default PreviousEntriesTable;