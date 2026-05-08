import { Card, Alert } from '@/components/common';

export function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>

          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Confidentiality</h2>
              <p>
                All information exchanged and any associated information of other interestin students
                is confidential and proprietary information. Any unauthorized sharing or disclosure
                can be held responsible.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. Non-Tampering and Non-Hacking
              </h2>
              <p>
                You shall not attempt to, or assist others to, disrupt or tamper with the working
                state and functionality of the server, application, website and its components. Any
                unauthorized access or tampering will be treated as a serious violation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Liability Clause</h2>
              <p>
                We, the concerned developers and organizations provide no warranties. The company
                bears no liability for damages or compensation and is not responsible to end users
                or third parties for any loss or damages incurred in connection with this service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Evaluation</h2>
              <p>
                During the evaluation, you are required to follow all instructions provided. Any
                form of cheating, plagiarism or using prohibited resources will result in immediate
                disqualification. Your actions will be monitored.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Access Code</h2>
              <p>
                The access code (uKaJfm) is unique to you and should not be shared with anyone. It
                is your responsibility to keep it confidential.
              </p>
            </section>

            <Alert
              type="warning"
              title="Important"
              message="By proceeding with the evaluation, you agree to all terms and conditions mentioned above."
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
