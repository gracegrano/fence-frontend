import { Mail, Phone, Building, MapPin } from "lucide-react";

interface ClientCardProps {
  client: {
    id: string;
    name: string;
    company_name: string;
    email: string;
    phone: string;
    city: string;
    state: string;
  };
}

export function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{client.name}</h2>
        <div className="flex items-center text-gray-600 mb-4">
          <Building className="h-4 w-4 mr-2" />
          <span className="text-sm">{client.company_name}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
            <a href={`mailto:${client.email}`} className="text-sm truncate hover:text-blue-600 transition-colors">
              {client.email}
            </a>
          </div>

          <div className="flex items-center text-gray-600">
            <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
            <a href={`tel:${client.phone}`} className="text-sm hover:text-blue-600 transition-colors">
              {client.phone}
            </a>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{client.city}, {client.state}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
        <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">View Details</button>
      </div>
    </div>
  );
}
