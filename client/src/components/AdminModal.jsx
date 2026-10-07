import React, { useState, useEffect } from 'react';
import { X, Database, Users, Calendar, Mail, CheckCircle2, RefreshCw, Key, Shield, Layers } from 'lucide-react';
import { fetchMembers, fetchStats, fetchHealth } from '../services/api';

export default function AdminModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [members, setMembers] = useState([]);
  const [stats, setStats] = useState(null);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('members'); // members | database | help
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [membersData, statsData, healthData] = await Promise.all([
        fetchMembers(),
        fetchStats(),
        fetchHealth(),
      ]);
      setMembers(membersData);
      setStats(statsData);
      setHealth(healthData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredMembers = members.filter((m) =>
    (m.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (m.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (m.membership_code || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#10121a] border border-zinc-700/80 rounded-3xl max-w-4xl w-full h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Top Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-[#0c0d12]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center border border-red-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  FitZone Database & Management Console
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  health?.database === 'mysql'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                }`}>
                  Engine: {health?.database === 'mysql' ? 'MySQL 8.0 Live' : 'Embedded DB Ready'}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Full-stack node.js + MySQL schema integration with automated seeding.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              title="Refresh DB Data"
              className="p-2 rounded-lg bg-zinc-800 text-zinc-300 hover:text-white transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-zinc-900/40 border-b border-zinc-800 text-xs">
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-500 block">Registered Members</span>
            <span className="text-xl font-black text-white font-['Outfit'] mt-1 block">
              {members.length}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-500 block">Active Subscriptions</span>
            <span className="text-xl font-black text-emerald-400 font-['Outfit'] mt-1 block">
              {members.filter((m) => m.status === 'active').length}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-500 block">Total Est. Revenue</span>
            <span className="text-xl font-black text-white font-['Outfit'] mt-1 block">
              ₹{members.reduce((acc, m) => acc + (Number(m.amount_paid) || 0), 0).toLocaleString('en-IN')}
            </span>
          </div>
          <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
            <span className="text-zinc-500 block">Storage Engine</span>
            <span className="text-sm font-bold text-red-400 font-mono mt-1 block uppercase">
              {health?.database || 'MySQL'}
            </span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="px-6 pt-3 border-b border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('members')}
              className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 ${
                activeTab === 'members'
                  ? 'border-red-500 text-white bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Members Directory ({members.length})
            </button>
            <button
              onClick={() => setActiveTab('database')}
              className={`px-4 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 ${
                activeTab === 'database'
                  ? 'border-red-500 text-white bg-zinc-900/60'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              MySQL Configuration & Schema
            </button>
          </div>

          {activeTab === 'members' && (
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or member ID..."
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 outline-none w-64"
            />
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'members' && (
            <div className="space-y-4">
              {filteredMembers.length === 0 ? (
                <div className="text-center py-16 text-zinc-500 text-sm">
                  No members found matching your search.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-500 font-bold uppercase">
                        <th className="pb-3 pl-2">Member ID</th>
                        <th className="pb-3">Name</th>
                        <th className="pb-3">Plan</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Valid Until</th>
                        <th className="pb-3 pr-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {filteredMembers.map((m) => (
                        <tr key={m.id || m.membership_code} className="hover:bg-zinc-900/40">
                          <td className="py-3 pl-2 font-mono font-bold text-red-400">
                            {m.membership_code}
                          </td>
                          <td className="py-3">
                            <div className="font-semibold text-white">{m.full_name}</div>
                            <div className="text-[11px] text-zinc-400">{m.email}</div>
                          </td>
                          <td className="py-3">
                            <span className="text-zinc-300 font-medium">{m.plan}</span>
                            <span className="text-[10px] text-zinc-500 block uppercase">
                              {m.billing_cycle}
                            </span>
                          </td>
                          <td className="py-3 font-semibold text-white">
                            ₹{Number(m.amount_paid || 0).toLocaleString('en-IN')}
                          </td>
                          <td className="py-3 text-zinc-400">
                            {m.expiry_date}
                          </td>
                          <td className="py-3 pr-2">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase">
                              {m.status || 'Active'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-6 text-xs text-zinc-300">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                  <Key className="w-4 h-4 text-red-500" />
                  <span>Connecting Your Local MySQL Server 8.0</span>
                </h4>
                <p className="text-zinc-400 leading-relaxed mb-3">
                  Your MySQL Server 8.0 is running on Windows. The backend is configured to automatically connect, create the <code className="text-red-400 bg-black/40 px-1 py-0.5 rounded">fitzone_db</code> database, and initialize the relational tables.
                </p>
                <div className="p-3 rounded-lg bg-black/60 font-mono text-[11px] text-zinc-300 space-y-1">
                  <div># File: server/.env</div>
                  <div>PORT=5000</div>
                  <div>DB_HOST=localhost</div>
                  <div>DB_USER=root</div>
                  <div>DB_PASSWORD=<span className="text-amber-400">&lt;your_mysql_root_password&gt;</span></div>
                  <div>DB_NAME=fitzone_db</div>
                  <div>DB_PORT=3306</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-red-500" />
                  <span>Database Tables Configured</span>
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    <span><strong className="text-white">plans:</strong> Basic, Premium, Pro tiers & rates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    <span><strong className="text-white">members:</strong> VIP membership registrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    <span><strong className="text-white">trainers:</strong> Elite coach profiles & ratings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    <span><strong className="text-white">classes:</strong> Weekly class timetable slots</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    <span><strong className="text-white">bookings:</strong> Reserved session bookings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500" />
                    <span><strong className="text-white">inquiries:</strong> Contact messages & inquiries</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
